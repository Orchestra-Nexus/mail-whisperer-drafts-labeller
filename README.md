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

---

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f064033c-bce7-4a31-a8c7-35269f2a355d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f064033c-bce7-4a31-a8c7-35269f2a355d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f064033c-bce7-4a31-a8c7-35269f2a355d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
