# TeamTask Database Documentation

TeamTask uses PostgreSQL as its primary relational database.

Entity Framework Core is used as the ORM.

---

# Database

Database:

```text
teamtask
```

Default PostgreSQL port:

```text
5432
```

---

# Tasks Table

The main table is:

```text
Tasks
```

---

# Schema

| Column    | Type      | Required | Description              |
| --------- | --------- | -------- | ------------------------ |
| Id        | UUID      | Yes      | Unique task identifier   |
| Title     | VARCHAR   | Yes      | Task title               |
| Assignee  | VARCHAR   | Yes      | Assigned team member     |
| Priority  | VARCHAR   | Yes      | Low, Medium, High        |
| DueDate   | DATE      | Yes      | Task due date            |
| Status    | VARCHAR   | Yes      | To Do, In Progress, Done |
| CreatedAt | TIMESTAMP | Yes      | Creation timestamp       |
| UpdatedAt | TIMESTAMP | Yes      | Last update timestamp    |

---

# Entity Relationship

The current application contains one main entity:

```text
Tasks
```

Future versions may introduce:

```text
Users
Teams
Projects
Comments
Attachments
```

---

# Entity Framework Core

The application uses:

```text
Entity Framework Core
        ↓
Npgsql Provider
        ↓
PostgreSQL
```

---

# Migrations

Create migration:

```bash
dotnet ef migrations add InitialCreate
```

Apply migration:

```bash
dotnet ef database update
```

List migrations:

```bash
dotnet ef migrations list
```

---

# Seed Data

The application should create at least five sample tasks.

Recommended:

```text
Design Login Page
Create Dashboard
Implement API
Write Unit Tests
Prepare Documentation
Deploy Application
```

Seed data should only be inserted when the database does not already contain the required records.

---

# Database Backup

For production databases, regular backups should be enabled through the selected PostgreSQL hosting provider.

Never store database backups inside the Git repository.

---

# Security

Never commit:

* Database passwords
* Production connection strings
* API keys
* Access tokens

Use environment variables or secure hosting-provider configuration.
