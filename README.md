# Mail Whisperer Drafts Labeller – Gmail Dashboard

## Ziel
Ein interaktives Gmail Dashboard, das E-Mails mit Hilfe eines KI-Agents (über MCP-Server) kategorisiert, Vorschläge macht und mit einem FastAPI-Backend sowie PostgreSQL für Audit Trails arbeitet. Das Frontend wird regelmäßig aktualisiert und unterstützt einen Chat mit dem Agenten via Websockets.

## Architektur
- **Frontend**: React/Vite (bereits vorhanden)
- **Backend**: FastAPI (wird ergänzt)
- **Datenbank**: PostgreSQL (für Audit Trails)
- **Agent-Kommunikation**: Websockets (Chat mit KI-Agent)
- **MCP-Server**: Bereits laufend, Anbindung wie in `test.py`

## Features (Soll-Zustand)
- E-Mail-Übersicht, Detailansicht, Label-Management
- Chat-Interface für Interaktion mit dem Agenten (Websocket)
- Backend-API für E-Mail- und Audit-Trail-Handling
- PostgreSQL für Audit Trails (z.B. wer hat was wann gelabelt)
- Regelmäßige Aktualisierung des Frontends (Polling oder Websockets)
- Authentifizierung (optional, später)

## Was ist bereits vorhanden?
- Frontend-Grundstruktur (React/Vite, siehe `src/`)
- Beispiel-Agenten-Anbindung in `test.py`
- MCP-Server läuft extern

## Was muss gemacht werden?
1. **Backend (FastAPI) aufsetzen**
    - Endpunkte für E-Mail-Listen, Details, Label-Änderungen, Audit-Trails
    - Websocket-Endpunkt für Chat mit Agenten
    - Anbindung an MCP-Server (siehe `test.py`)
    - Verbindung zu PostgreSQL (z.B. mit SQLAlchemy)
2. **PostgreSQL einrichten**
    - Datenbankmodell für Audit Trails
    - Migrationen (z.B. mit Alembic)
3. **Frontend erweitern**
    - API-Integration für E-Mails, Labels, Audit-Trails
    - Websocket-Integration für Chat
    - UI für Audit-Trail-Anzeige
    - Regelmäßige Aktualisierung (Polling/Websocket)
4. **Deployment/Entwicklung**
    - Docker Compose für Backend + DB (optional)
    - .env-Konfiguration für Secrets

## Beispiel: Backend FastAPI Struktur
- `/api/emails` – Liste, Details, Label-Änderung
- `/api/audit` – Audit-Trail-Logs
- `/ws/agent` – Websocket für Chat

## Nächste Schritte
- [ ] FastAPI Backend Grundgerüst erstellen
- [ ] PostgreSQL Datenbankmodell definieren
- [ ] Websocket-Chat-Endpoint implementieren
- [ ] Frontend-API- und Websocket-Anbindung
- [ ] Audit Trail im Backend und Frontend anzeigen

## Referenz
- Siehe `test.py` für Agenten-Anbindung
- MCP-Server muss laufen

---

**Fragen/Feedback willkommen!**

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
