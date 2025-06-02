# agent_ws.py
"""
WebSocket-Handler für Agent-Chat (ausgelagert aus backend_main.py)
"""
from fastapi import WebSocket, WebSocketDisconnect
import asyncio
import json
from dotenv import load_dotenv
import os
import logging
import warnings
from google import genai
from google.genai.types import GenerateContentConfig, HttpOptions
from google.adk.agents import Agent
from google.adk.models.lite_llm import LiteLlm # For multi-model support
from mcp import ClientSession, StdioServerParameters
from mcp.client.sse import sse_client
from pydantic import BaseModel
from litellm import experimental_mcp_client
import litellm
warnings.filterwarnings("ignore")
logging.basicConfig(level=logging.ERROR)
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

async def agent_websocket(websocket: WebSocket):
    await websocket.accept()
    try:
        GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
        client = genai.Client(api_key=GEMINI_API_KEY)
        while True:
            data = await websocket.receive_text()
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
    except Exception as e:
        await websocket.send_text(f"Agent error: {str(e)}")
        await websocket.close()
