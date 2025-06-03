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

## Entwicklungs- und Build-Setup

### Build-Images und Produktion

Die Build- und Dockerfiles befinden sich im Ordner `build/`.

- Zum Bauen der Images und Starten der Container für Produktion oder Build-Tests:

  ```bash
  docker compose -f build/docker-compose.build.yml build
  docker compose -f build/docker-compose.build.yml up
  ```

### Entwicklung (Hot-Reload, lokale Quellcodes)

Für die lokale Entwicklung werden vorbereitete Images verwendet und die eigentlichen Entwicklungsserver (z.B. Vite, Uvicorn) laufen außerhalb von Docker oder in eigenen Dev-Images.

- Starte die Entwicklungsumgebung mit:

  ```bash
  docker compose -f docker-compose.dev.yml up
  ```

- Passe ggf. die Umgebungsvariablen in einer `.env`-Datei an.

### Hinweise

- Die alten Dockerfiles und Compose-Dateien wurden in den `build/`-Ordner verschoben.
- Für lokale Entwicklung empfiehlt sich, das Frontend direkt mit `npm run dev` und das Backend mit `uvicorn` zu starten, um Hot-Reload zu nutzen.
- Die Datenbank bleibt persistent im Volume `db_data`.

## Backend-Image bauen und pushen

Um das Backend-Image zu bauen und in die Registry zu pushen, führe aus:

```bash
# Einmalig anmelden (nur nötig, wenn du noch nicht eingeloggt bist)
docker login

# Image bauen und pushen (TAG ersetzen, z.B. "latest" oder "v1")
./build_and_push_backend.sh <TAG>
```

Das Image wird als `orchestranexus/agentbox:<TAG>` gebaut und gepusht.

Passe anschließend in deiner `docker-compose.yml` den Backend-Service an:

```yaml
backend:
  image: orchestranexus/agentbox:<TAG>
  ...
```

Danach kannst du wie gewohnt mit Compose starten:

```bash
docker compose up
```

## Roadmap / TODO
- [x] Persist scheduled tasks and audit logs in the database (PostgreSQL instead of in-memory)
- [x] Implement real execution of scheduled tasks (email, cron, agent event)
- [x] Add authentication for task management (basic auth present, more planned)
- [x] UI/UX polish: sidebar navigation, filters, modern components
- [x] Integrate more agent/tool logic (Google Docs, email checks, Gemini/MCP)
- [x] FastAPI backend skeleton created
- [x] PostgreSQL database model defined
- [x] WebSocket chat endpoint implemented
- [x] Frontend connected to API and WebSocket
- [x] Audit trail is shown in backend and frontend
- [x] Build and dev workflows separated with Docker Compose
- [x] Automated backend image build & push to Docker Hub
- [ ] Advanced authentication (OAuth, SSO, etc.)
- [ ] Scheduler: advanced timing, recurrence, error handling
- [ ] More integrations (e.g. Google Calendar, Slack)
- [ ] Improved test coverage (unit/integration)
- [ ] Deployment documentation for cloud environments

## Next steps
- [ ] Advanced authentication (OAuth, SSO, etc.)
- [ ] Expand scheduler features
- [ ] More integrations (e.g. Google Calendar, Slack)
- [ ] Increase test coverage
- [ ] Automate cloud deployment

## Achieved milestones
- FastAPI backend with WebSocket and REST API
- PostgreSQL database for audit trail and scheduler
- Modern React/Vite frontend with scheduler and audit trail pages
- Agent integration (Gemini/MCP) with WebSocket chat
- Docker Compose for development and production
- Automated image build & push to Docker Hub

## File Structure

```
mail-whisperer-drafts-labeller/
├── backend/                # FastAPI backend (Python)
│   ├── agent_ws.py         # Main agent logic
│   ├── agent_scheduler.py  # Scheduler logic
│   ├── ws_manager.py       # WebSocket manager
│   ├── tools_wrapper.py    # Tool integration
│   ├── backend_main.py     # (Entry point, if used)
│   └── test/               # Backend tests
│       ├── test_agent_manager.py
│       └── test_mcp_tools.py
├── frontend/               # React/Vite frontend (TypeScript)
│   ├── src/                # Main source code
│   │   ├── components/     # UI components
│   │   ├── pages/          # App pages (Scheduler, AuditTrail, etc.)
│   │   └── ...             # Other frontend code
│   ├── public/             # Static assets
│   └── ...                 # Configs, package.json, etc.
├── db/                     # Database initialization
│   └── db_init.sql
├── mcp/                    # MCP server scripts and config
│   ├── config/
│   └── scripts/
├── build/                  # Docker build files
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.build.yml
├── docker-compose.yml      # Main compose file (uses pushed images)
├── docker-compose.dev.yml  # Dev compose file (for local dev servers)
├── build_and_push_backend.sh # Script to build & push backend image
├── requirements.txt        # Python dependencies
├── README.md
└── ...
```

---

**Questions/Feedback welcome!**

