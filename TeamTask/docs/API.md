# TeamTask API Documentation

The TeamTask backend exposes a RESTful API using ASP.NET Core Web API.

Base URL:

```text
/api
```

---

# Task Model

```json
{
  "id": "uuid",
  "title": "Design Login Page",
  "assignee": "Sarah",
  "priority": "High",
  "dueDate": "2026-08-20",
  "status": "In Progress",
  "createdAt": "2026-08-15T08:00:00Z",
  "updatedAt": "2026-08-15T08:00:00Z"
}
```

---

# 1. Get All Tasks

```http
GET /api/tasks
```

Returns all tasks sorted by due date.

Example response:

```json
[
  {
    "id": "123",
    "title": "Design Login Page",
    "assignee": "Sarah",
    "priority": "High",
    "dueDate": "2026-08-20",
    "status": "To Do"
  }
]
```

---

# 2. Get Task

```http
GET /api/tasks/{id}
```

Example:

```http
GET /api/tasks/123
```

Returns one task.

---

# 3. Create Task

```http
POST /api/tasks
```

Request:

```json
{
  "title": "Create Dashboard",
  "assignee": "John",
  "priority": "High",
  "dueDate": "2026-08-25",
  "status": "To Do"
}
```

Success:

```text
201 Created
```

---

# 4. Update Task

```http
PUT /api/tasks/{id}
```

Request:

```json
{
  "title": "Create Dashboard",
  "assignee": "John",
  "priority": "Medium",
  "dueDate": "2026-08-28",
  "status": "In Progress"
}
```

---

# 5. Update Status

```http
PUT /api/tasks/{id}/status
```

Request:

```json
{
  "status": "Done"
}
```

Valid values:

```text
To Do
In Progress
Done
```

---

# 6. Delete Task

```http
DELETE /api/tasks/{id}
```

Example:

```http
DELETE /api/tasks/123
```

Success:

```text
204 No Content
```

---

# 7. Search Tasks

```http
GET /api/tasks?search=dashboard
```

Search is case-insensitive.

---

# 8. Filter by Status

```http
GET /api/tasks?status=Done
```

---

# 9. Filter by Assignee

```http
GET /api/tasks?assignee=Sarah
```

---

# 10. Combined Filtering

Example:

```http
GET /api/tasks?search=API&status=To%20Do&assignee=John
```

---

# Validation

## Title

Required.

Invalid:

```json
{
  "title": ""
}
```

---

## Due Date

The due date cannot be in the past.

Invalid:

```json
{
  "dueDate": "2020-01-01"
}
```

---

## Priority

Valid values:

```text
Low
Medium
High
```

---

## Status

Valid values:

```text
To Do
In Progress
Done
```

---

# HTTP Status Codes

| Status | Meaning                       |
| ------ | ----------------------------- |
| 200    | Request successful            |
| 201    | Resource created              |
| 204    | Resource deleted successfully |
| 400    | Invalid request               |
| 404    | Task not found                |
| 500    | Server error                  |

---

# Swagger

During development, API documentation can be accessed through Swagger.

Example:

```text
http://localhost:5000/swagger
```

Swagger should be used to test the API before connecting the frontend.
