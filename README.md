# Mail Whisperer Drafts Labeller – Gmail Dashboard

## Goal
An interactive Gmail dashboard that categorizes emails using an AI agent (via MCP server), provides suggestions, and works with a FastAPI backend and PostgreSQL for audit trails. The frontend is regularly updated and supports chat with the agent via WebSockets.

## Architecture
- **Frontend**: React/Vite (already present)
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL (for audit trails)
- **Agent Communication**: WebSockets (chat with AI agent)
- **MCP Server**: Already running, integration as in `test.py`
- **Docker Compose**: Orchestrates backend, database, and MCP server

## Branding
- **Favicon & Social Preview**: Uses a modern Gmail SVG icon for favicon and social previews (see `frontend/index.html`).

## Quick Start with Docker Compose

1. **Requirements:**
   - [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed

2. **Start the project:**
   ```sh
   docker compose up --build
   ```
   - The backend will be available at http://localhost:8000
   - The database runs on port 5432
   - The MCP server (gmail) runs as configured in the compose file

3. **Start the frontend locally (optional):**
   - Change to the `frontend/` directory and start the frontend as usual (e.g., with `npm run dev`).

4. **Database initialization:**
   - The SQL script `db/db_init.sql` is executed automatically on first start.

## Services in docker-compose.yml
- **backend**: FastAPI app (Python, port 8000)
- **db**: PostgreSQL database (port 5432)
- **gmail**: MCP server for Gmail bridge

## Example: Backend FastAPI structure
- `/api/emails` – List, details, label change
- `/api/audit` – Audit trail logs
- `/ws/agent` – WebSocket for chat

## Development
- Changes to the backend may require a container restart (`docker compose restart backend`).
- You can use a `.env` file for environment variables.

## Next steps
- [ ] Create FastAPI backend skeleton
- [ ] Define PostgreSQL database model
- [ ] Implement WebSocket chat endpoint
- [ ] Connect frontend to API and WebSocket
- [ ] Display audit trail in backend and frontend

## Reference
- See `test.py` for agent integration
- MCP server must be running

---

**Questions/Feedback welcome!**

