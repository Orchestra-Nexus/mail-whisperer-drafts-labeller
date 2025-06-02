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

## Features & Recent Changes

### Scheduler System
- **Scheduler Page**: New `/scheduler` page in the frontend for creating, pausing, and deleting scheduled tasks (email, cronjob, agent event).
- **Backend API**: Endpoints for managing scheduler tasks (`/api/scheduler/tasks`, `/api/scheduler/task`, pause/delete). Currently uses in-memory store; DB persistence planned.
- **AgentScheduler**: Backend logic for scheduling and (soon) executing tasks.

### Audit Trail
- **Audit Trail Page**: New `/audit` page in the frontend displays audit logs from the backend.
- **Backend**: `/api/audit` endpoint returns audit logs from PostgreSQL.
- **Audit Logging**: Actions like labeling emails are logged to the audit trail.

### WebSocket Agent Chat
- **Real-time Chat**: `/ws/agent` endpoint enables chat with the AI agent (Gemini/MCP integration) via WebSocket.
- **Error Handling**: Improved error/traceback reporting to frontend.

### Security & Secrets
- **Environment Variables**: All secrets (e.g., `GEMINI_API_KEY`, DB credentials) are handled via `.env` and passed securely in Docker Compose.
- **.gitignore**: Updated to ignore all sensitive files, build artifacts, and node_modules.

### Branding & UI
- **Branding**: All default branding removed. Gmail icon used for favicon/social preview.
- **UI**: Modern, clean React/Vite frontend. Scheduler and Audit Trail pages added.

## Usage

- **Scheduler**: Go to `/scheduler` to manage scheduled tasks. (Currently demo; real execution and DB persistence coming soon.)
- **Audit Trail**: Go to `/audit` to view recent audit logs (actions, labels, etc.).
- **Agent Chat**: Use the chat interface (if present) to interact with the AI agent in real time.

## Environment Variables
- Place a `.env` file in the root with at least:
  ```env
  GEMINI_API_KEY=your_gemini_api_key
  DATABASE_URL=postgresql://postgres:postgres@db:5432/mailwhisperer
  ```
- All services in Docker Compose will pick up these variables.

## Roadmap / TODO
- [ ] Persist scheduled tasks and audit logs in the database (not just in-memory)
- [ ] Implement real execution of scheduled tasks (email, cron, agent event)
- [ ] Add authentication for task management
- [ ] Further UI/UX polish (sidebar navigation, filters, etc.)
- [ ] Integrate more agent/tool logic (e.g., Google Docs, email checks)

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

