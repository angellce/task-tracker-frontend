# Task Tracker Frontend

A small React app for the Task Tracker REST API (Spring Boot, in `../project1`).
It lists projects, shows each project's tasks with a status filter, and lets you
create, edit and delete tasks.

## Prerequisites

- Node.js 20.19+ or 22.12+ (Vite 8 requires it), npm
- Java (JDK) 21 or newer for the backend

## Run backend and frontend together

1. Backend (terminal 1), runs on http://localhost:8080:
   ```bash
   cd ~/Downloads/project1
   ./mvnw spring-boot:run
   ```
2. Frontend (terminal 2), runs on http://localhost:5173:
   ```bash
   cd ~/Downloads/project1-frontend
   npm install
   npm run dev
   ```
3. Open http://localhost:5173

The Vite dev server forwards every request starting with `/api` to
`http://localhost:8080` (see `vite.config.js`), so there are no CORS problems.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with the `/api` proxy |
| `npm run build` | Production build into `dist/` |
| `npm run lint` | Lint with oxlint |

## Screens

| URL | Screen |
|---|---|
| `/projects` | Project list (paged, newest first) and a form to create a project |
| `/projects/:projectId/tasks` | Tasks of one project: status filter, paging, edit and delete |
| `/projects/:projectId/tasks/new` | Create a task |
| `/projects/:projectId/tasks/:taskId/edit` | Edit a task |

## Stack

React 19, Vite 8, react-router-dom 7, plain JavaScript, fetch (wrapped in
`src/api/client.js`), plain CSS (`src/index.css`), oxlint.

## Good to know

- The backend uses an in-memory H2 database: all data is lost when the backend restarts.
- A task's due date must be in the future (backend rule), so today's date is rejected.
- `.npmrc` sets `legacy-peer-deps=true` because npm 10 crashed while resolving
  optional peer dependencies of the Vite toolchain.
