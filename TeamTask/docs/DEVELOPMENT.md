# TeamTask Development Plan

The project is implemented incrementally.

Each phase must compile, run, and pass its relevant tests before the team moves to the next phase.

---

# Phase 1 — Project Foundation

## Goals

- Create GitHub repository
- Create React frontend
- Create ASP.NET Core backend
- Configure project structure
- Configure CORS
- Configure Swagger

## Acceptance Criteria

- Frontend starts
- Backend starts
- Swagger opens
- Git repository works

---

# Phase 2 — PostgreSQL

## Goals

- Install PostgreSQL
- Create teamtask database
- Configure connection string
- Configure EF Core
- Configure Npgsql

## Acceptance Criteria

- Backend connects to PostgreSQL
- No database connection errors

---

# Phase 3 — Database Model

Create:

```text
Task
TaskDbContext
```

Configure:

```text
Id
Title
Assignee
Priority
DueDate
Status
CreatedAt
UpdatedAt
```

---

# Phase 4 — Migrations

Create and apply:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Acceptance:

* Tasks table exists
* Migration completes successfully

---

# Phase 5 — CRUD API

Implement:

```text
GET
GET by ID
POST
PUT
DELETE
```

Acceptance:

* All endpoints work through Swagger

---

# Phase 6 — Validation

Implement:

* Required title
* Valid priority
* Valid status
* Due date cannot be in the past

Acceptance:

Invalid requests return HTTP 400.

---

# Phase 7 — Seed Data

Insert at least five sample tasks.

Acceptance:

The application starts with sample tasks available.

---

# Phase 8 — Frontend Integration

Connect React to the API.

Acceptance:

```text
React → API → PostgreSQL
```

works successfully.

---

# Phase 9 — Task Management UI

Implement:

* All Tasks
* Add Task
* Status update
* Delete task

---

# Phase 10 — Search and Filtering

Implement:

* Search
* Status filtering
* Assignee filtering
* Due-date sorting

---

# Phase 11 — Task Summary

Display:

* Total
* To Do
* In Progress
* Done

---

# Phase 12 — Responsive UI

Support:

* Desktop
* Tablet
* Mobile

---

# Phase 13 — Testing

Test:

* API
* Forms
* CRUD
* Filters
* Search
* Validation
* Responsive UI

---

# Phase 14 — Deployment

Deploy:

```text
Frontend → Vercel
Backend → Render / Azure
Database → Neon / Render / Azure PostgreSQL
```

---

# Phase Completion Rule

Do not move to the next phase if the current phase contains unresolved errors.

Each phase should have:

1. Implementation
2. Testing
3. Git commit
4. Code review
5. Merge
