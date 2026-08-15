# TeamTask Backend

The TeamTask backend is an ASP.NET Core Web API responsible for business logic, validation, CRUD operations, and PostgreSQL communication.

---

# Technology

- C#
- ASP.NET Core
- Entity Framework Core
- Npgsql
- PostgreSQL
- Swagger / OpenAPI

---

# Requirements

Install:

- .NET 8 SDK
- PostgreSQL
- Entity Framework Core CLI

---

# Restore Dependencies

```bash
dotnet restore
```

---

# Database Configuration

Configure:

```text
ConnectionStrings:DefaultConnection
```

Example:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=teamtask;Username=teamtask_user;Password=your_password"
  }
}
```

Never commit production credentials.

---

# Entity Framework

Create migration:

```bash
dotnet ef migrations add InitialCreate
```

Apply migration:

```bash
dotnet ef database update
```

---

# Run API

```bash
dotnet run
```

---

# Swagger

Open:

```text
http://localhost:5000/swagger
```

The exact port depends on the configured launch settings.

---

# API Endpoints

```text
GET    /api/tasks
GET    /api/tasks/{id}
POST   /api/tasks
PUT    /api/tasks/{id}
PUT    /api/tasks/{id}/status
DELETE /api/tasks/{id}
```

---

# Architecture

```text
Controller
    ↓
Service
    ↓
Entity Framework Core
    ↓
PostgreSQL
```

Controllers should remain lightweight.

Business logic should be handled by services.

---

# Validation

The API validates:

* Required title
* Priority
* Status
* Due date

The backend must never rely only on frontend validation.

---

# Build

```bash
dotnet build
```

---

# Test

```bash
dotnet test
```

---

# Production Publish

```bash
dotnet publish -c Release
```
