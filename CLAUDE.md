# Task Tracker Frontend: Instructions for Claude Code

Small React frontend for an existing Spring Boot REST API (projects and tasks).
Read this whole file before doing anything. Follow it exactly.

---

## 1. Project facts (do not change without asking)

- This folder is a NEW, separate project: `~/Downloads/project1-frontend`
- The backend lives in `~/Downloads/project1` (Spring Boot, runs on `http://localhost:8080`). It is a READ-ONLY reference. Never edit, create, or delete anything there. If the backend needs a change, STOP and tell me what and why.
- Stack: React + Vite, plain JavaScript (not TypeScript), npm
- Routing: `react-router-dom`
- HTTP: the browser `fetch` API, wrapped in one small module `src/api/client.js`. No axios.
- Styling: one plain CSS file per page or component, or a single `index.css`. No UI libraries (no Tailwind, MUI, Bootstrap).
- State: React hooks only (`useState`, `useEffect`). No Redux, no other state libraries.
- Dev server: `npm run dev`. The backend must be running (`./mvnw spring-boot:run` in the backend folder) for real data.
- API access: use the Vite dev proxy in `vite.config.js` so the browser calls a relative path and there are NO CORS problems and NO backend changes. Read the backend controllers first, decide whether a path prefix like `/api` is needed, and explain your choice in the proposal.
- Git: this folder has its own repo. Work on branch `main`.

**Scope:** the frontend only. No authentication, no backend changes, no deployment, no Docker.

---

## 2. How we work (MANDATORY for every task)

I am a student learning React and how a frontend talks to a backend. I must understand and approve everything before it changes.

### Step 1: PROPOSE (no edits yet)
Before creating or changing ANY file, present a proposal in this format:

```
PROPOSAL: Task FN: <name>
1. What I will do (plain language, 3-6 sentences)
2. New concepts explained (2-3 simple sentences each, for anything new to me)
3. Files to create / change (full paths)
4. Dependencies / config changes (exact package and version, or "none")
5. Key code (snippets of the important parts)
6. Why this approach, and the alternatives I considered
7. Risks and open questions
8. How I will verify it (which commands, what I should see in the browser)
Waiting for your approval. Reply "approved" or tell me what to change.
```

Reading files and running read-only commands is allowed before a proposal.
Editing, creating or deleting files and installing packages is NOT allowed until I reply "approved".

### Step 2: IMPLEMENT only what was approved
Nothing extra. No bonus features, no restyling, no "while I was there" changes.
If something outside the approved scope needs to change, STOP and ask.

### Step 3: VERIFY
Run `npm run build` and `npm run lint` (if lint is configured) and show me the real output. Tell me exactly what to click in the browser to check the result, since you cannot see the screen.

### Step 4: REPORT and wait for approval again
```
RESULT: Task FN
- Files changed (output of `git status` / `git diff --stat`)
- Build result
- What I should check in the browser (step by step)
- Draft notes for my AI_LOG.md: (a) what I asked, (b) what you produced, (c) one thing to verify or that was wrong
Waiting for your approval to commit.
```

### Step 5: COMMIT only after I approve
- One commit per task, message format: `task FN: short description`
- Never push. Never force-anything.
- Never delete files without asking first.

I write my own AI_LOG.md. Do not edit it.

---

## 3. When to STOP and ask me (do not guess)

Stop immediately, ask clear plain questions, and wait for my answer when:
- You are not sure what an endpoint returns. Read the controller and DTO in the backend, or ask me. NEVER invent endpoints, fields, or response shapes.
- A requirement is unclear or there is more than one reasonable design (explain the options briefly and recommend one)
- The backend seems to have a bug or an inconsistency (report it to me, do not work around it silently)
- You need to add a dependency or change `vite.config.js`
- A build or runtime error is not obvious after 2 attempts. Do not keep retrying blindly.
- You are unsure whether a package version is compatible with the installed Node version. Check `node -v` first and never guess versions.
- You do not understand something about my request

---

## 4. Technical rules for ALL tasks

- Function components and hooks only. No class components.
- One responsibility per component. Keep components small and readable.
- All API calls go through `src/api/client.js` (and small per-resource files such as `src/api/projects.js`, `src/api/tasks.js`). Components never call `fetch` directly.
- Every screen handles three states: loading, error, and empty. Show real error messages from the backend, not just "Something went wrong".
- Read the backend's `GlobalExceptionHandler` and error DTO to learn the real error JSON shape, then display validation errors next to the right form fields.
- If the backend list endpoints are paginated (check the controllers), the UI must use the real response shape and offer next/previous page buttons.
- Use the exact enum values the backend accepts for status and priority (read the backend enums). Do not hardcode guesses.
- No `dangerouslySetInnerHTML`. No secrets or tokens in the code.
- Keep code simple and readable. Prefer plain, obvious code over clever abstractions. Comment only what is not obvious.
- Folder layout: `src/api`, `src/pages`, `src/components`.

---

## 5. Task list

Do the tasks IN ORDER, one at a time. After each task, wait for my approval before starting the next.

#### Task F1: Read-only review of the backend API (no changes)
- **Use:** Read, Glob, Grep only, on `~/Downloads/project1`. Do NOT edit anything there or here.
- **Report back:**
  1. Table of all endpoints: HTTP method, path, request body fields (with required/optional), response shape, status codes
  2. The exact enum values for task status and priority
  3. The error JSON shape from `GlobalExceptionHandler` (validation errors, 404, and any others)
  4. Whether list endpoints are paginated or filterable, and the exact query parameters
  5. Anything the frontend must be careful about
- **Done when:** I reply "approved, go to F2". No commit needed.

#### Task F2: Project setup and API client
- **Use:** Vite React template (JavaScript), `react-router-dom`, the Vite proxy.
- **Do:** scaffold the app in this folder, add a `.gitignore` that excludes `node_modules` and `dist`, configure the proxy based on the F1 findings, create `src/api/client.js` (a small `request()` function that parses JSON and throws a useful error object for non-2xx responses, including the backend's error body), and set up the router with empty pages for projects and tasks plus a simple navigation bar.
- **Done when:** `npm run build` passes and `npm run dev` shows the navigation. Commit: `task F2: project setup and API client`

#### Task F3: Projects page
- **Do:** list all projects (with loading, error and empty states), a form to create a project, and the ability to open a project to see its tasks. Use the real field names from F1.
- **Done when:** I can create a project in the browser and see it in the list. Commit: `task F3: projects page`

#### Task F4: Tasks page for a project
- **Do:** list the tasks of the selected project showing title, status, priority and due date, with a filter by status (use the backend's filter or pagination if it exists, otherwise filter in the browser and tell me which you chose), and a delete button with a confirmation.
- **Done when:** I can see, filter and delete tasks in the browser. Commit: `task F4: tasks page`

#### Task F5: Create and edit task form
- **Do:** one reusable form component for creating and editing a task (title, description, status, priority, due date, assignee, as the backend defines them). Show backend validation errors next to the right fields and a general error message for other failures. After saving, return to the task list.
- **Done when:** I can create a task, edit it, and see validation messages when I send invalid input. Commit: `task F5: task form`

#### Task F6: README
- **Do:** a short README with what the project is, how to run backend and frontend together, the screens, and the stack. Verify every command you write by running it. Do not claim anything that does not work.
- **Commit:** `task F6: README`

---

## 6. Quick reminder

PROPOSE, then wait for "approved", then IMPLEMENT only that, then VERIFY, then REPORT, then wait for "approved", then COMMIT.
Never invent API details. When in doubt or when anything is unclear: STOP AND ASK.