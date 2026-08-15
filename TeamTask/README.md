# TeamTask

A lightweight full-stack team task management web application designed for small teams to manage daily tasks without relying on spreadsheets.

TeamTask allows users to create, view, update, filter, search, and delete tasks through a responsive web interface.

The application uses React for the frontend, ASP.NET Core Web API for the backend, Entity Framework Core for data access, and PostgreSQL for persistent data storage.

---

## Features

### Core Features

- Create tasks
- View all tasks
- Update task status
- Delete tasks
- Filter tasks by status
- Filter tasks by assignee
- Sort tasks by due date
- Validate task title
- Validate due date
- Responsive interface
- Preloaded sample data
- Navigation between All Tasks and Add Task

### Stretch Features

- Search tasks by title
- Task count summary
- Persistent PostgreSQL storage

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend

- C#
- ASP.NET Core Web API
- Entity Framework Core
- REST API
- Swagger / OpenAPI

### Database

- PostgreSQL

### Development Tools

- Git
- GitHub
- Visual Studio Code
- Visual Studio / Rider
- PostgreSQL
- pgAdmin
- Docker / Docker Compose

---

## System Architecture

```text
┌─────────────────────────────┐
│       React Frontend        │
│                             │
│ TypeScript + Vite + Tailwind│
└──────────────┬──────────────┘
               │
               │ HTTP / JSON
               ▼
┌─────────────────────────────┐
│      ASP.NET Core API       │
│                             │
│ Controllers                │
│ Services                   │
│ DTOs                       │
│ Validation                 │
│ Entity Framework Core      │
└──────────────┬──────────────┘
               │
               │ SQL
               ▼
┌─────────────────────────────┐
│         PostgreSQL          │
│                             │
│          Tasks              │
└─────────────────────────────┘
```

---

## Project Structure

```text
TeamTask/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── Controllers/
│   ├── Data/
│   ├── Models/
│   ├── DTOs/
│   ├── Services/
│   ├── Migrations/
│   ├── Program.cs
│   └── TeamTask.Api.csproj
│
├── docs/
│   ├── SETUP.md
│   ├── API.md
│   ├── DATABASE.md
│   ├── DEPLOYMENT.md
│   ├── DEVELOPMENT.md
│   ├── TESTING.md
│   └── CONTRIBUTING.md
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## Requirements

Before running the project, install:

* Node.js 20+
* npm
* .NET 8 SDK or later
* PostgreSQL 16+
* Git

Optional:

* Docker
* Docker Compose
* pgAdmin

---

## Quick Start

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
cd TeamTask
```

### Backend

```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

The API will be available at:

```text
http://localhost:5000
```

Swagger:

```text
http://localhost:5000/swagger
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## Environment Configuration

Do not commit passwords, API keys, or production credentials.

Example backend configuration:

```text
ConnectionStrings__DefaultConnection
```

Example frontend configuration:

```text
VITE_API_BASE_URL
```

Create local environment files based on the examples provided in the project.

---

## Development Phases

The application is developed in the following phases:

1. Project setup
2. PostgreSQL database setup
3. Entity Framework Core configuration
4. Task model and migrations
5. REST API
6. Seed data
7. React frontend setup
8. Task display
9. Add task
10. Update status
11. Delete task
12. Search and filtering
13. Task summary
14. Responsive design
15. Testing
16. Deployment

Each phase should be completed and tested before moving to the next phase.

---

## API Endpoints

| Method | Endpoint                 | Description        |
| ------ | ------------------------ | ------------------ |
| GET    | `/api/tasks`             | Get all tasks      |
| GET    | `/api/tasks/{id}`        | Get task           |
| POST   | `/api/tasks`             | Create task        |
| PUT    | `/api/tasks/{id}`        | Update task        |
| PUT    | `/api/tasks/{id}/status` | Update task status |
| DELETE | `/api/tasks/{id}`        | Delete task        |

See `docs/API.md` for complete API documentation.

---

## Database

PostgreSQL is used as the primary persistent data store.

Main table:

```text
Tasks
```

Fields:

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

See `docs/DATABASE.md` for database setup and migration instructions.

---

## Testing

The application must be tested at three levels:

1. Backend API testing
2. Frontend functionality testing
3. End-to-end integration testing

See:

```text
docs/TESTING.md
```

for the complete testing checklist.

---

## Deployment

Recommended production architecture:

```text
React
  │
  ▼
Vercel
  │
  │ HTTPS
  ▼
ASP.NET Core API
  │
  ▼
PostgreSQL
```

See:

```text
docs/DEPLOYMENT.md
```

for the complete deployment process.

---

## Git Workflow

The project uses feature branches and pull requests.

Example:

```text
main
 │
 ├── feature/task-crud
 ├── feature/task-filter
 ├── feature/task-form
 └── feature/responsive-ui
```

See `docs/CONTRIBUTING.md`.

---

## Team Members

| Name     | Role                   | Main Contribution        |
| -------- | ---------------------- | ------------------------ |
| Member 1 | Backend Developer      | API / EF Core            |
| Member 2 | Frontend Developer     | React UI                 |
| Member 3 | Database / Integration | PostgreSQL / Integration |
| Member 4 | QA / Deployment        | Testing / Deployment     |

Replace the placeholders with the actual group members.

---

## License

This project was developed for educational purposes.
