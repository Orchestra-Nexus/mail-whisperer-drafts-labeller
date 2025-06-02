# FastAPI backend for Mail Whisperer Drafts Labeller
# Entry point: main.py

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import asyncio
import os
import asyncpg

app = FastAPI()

# CORS for local frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/mailwhisperer")

# Email/Audit models
class Email(BaseModel):
    id: int
    subject: str
    sender: str
    body: str
    label: Optional[str]

class AuditTrail(BaseModel):
    id: int
    email_id: int
    action: str
    user: str
    timestamp: str

# DB pool
@app.on_event("startup")
async def startup():
    app.state.db = await asyncpg.create_pool(DATABASE_URL)

@app.on_event("shutdown")
async def shutdown():
    await app.state.db.close()

# Email endpoints
@app.get("/api/emails", response_model=List[Email])
async def get_emails():
    rows = await app.state.db.fetch("SELECT * FROM emails")
    return [dict(row) for row in rows]

@app.get("/api/emails/{email_id}", response_model=Email)
async def get_email(email_id: int):
    row = await app.state.db.fetchrow("SELECT * FROM emails WHERE id=$1", email_id)
    return dict(row)

@app.post("/api/emails/{email_id}/label")
async def label_email(email_id: int, label: str):
    await app.state.db.execute("UPDATE emails SET label=$1 WHERE id=$2", label, email_id)
    # Audit log
    await app.state.db.execute(
        "INSERT INTO audit_trail (email_id, action, user, timestamp) VALUES ($1, $2, $3, NOW())",
        email_id, f"label:{label}", "user",  # TODO: real user
    )
    return {"status": "ok"}

@app.get("/api/audit", response_model=List[AuditTrail])
async def get_audit():
    rows = await app.state.db.fetch("SELECT * FROM audit_trail ORDER BY timestamp DESC LIMIT 100")
    return [dict(row) for row in rows]

# WebSocket for agent chat (MCP integration)
@app.websocket("/ws/agent")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            # MCP-Agentenaufruf (wie in test.py)
            import os
            import json
            from google import genai
            from google.genai.types import GenerateContentConfig
            from litellm import experimental_mcp_client
            from mcp.client.sse import sse_client
            from mcp import ClientSession
            GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
            client = genai.Client(api_key=GEMINI_API_KEY)
            async with sse_client("http://localhost:8000/mcp-server/sse/") as streams:
                async with ClientSession(*streams) as session:
                    await session.initialize()
                    mcp_tools = await experimental_mcp_client.load_mcp_tools(session=session, format="mcp")
                    response = client.models.generate_content(
                        model="gemini-2.0-flash",
                        contents=[data],
                        config=GenerateContentConfig(
                            system_instruction=["You are a Gmail agent. Your task is to use the available tools."],
                            tools=mcp_tools
                        ),
                    )
                    # Antwort auswerten
                    result_text = ""
                    if response.candidates and response.candidates[0].content.parts:
                        for part in response.candidates[0].content.parts:
                            if hasattr(part, 'function_call') and part.function_call is not None:
                                function_call = part.function_call
                                result = await session.call_tool(
                                    function_call.name, arguments=dict(function_call.args)
                                )
                                try:
                                    email_data = json.loads(result.content[0].text)
                                    result_text = json.dumps(email_data)
                                except Exception:
                                    result_text = result.content[0].text
                            else:
                                if response.text:
                                    result_text = response.text
                    else:
                        result_text = "Keine Antwort vom Agenten."
                    await websocket.send_text(result_text)
    except WebSocketDisconnect:
        pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend_main:app", host="0.0.0.0", port=8001, reload=True)
