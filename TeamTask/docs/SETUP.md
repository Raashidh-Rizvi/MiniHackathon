# TeamTask — Development Setup

This document explains how to configure and run the TeamTask application locally.

---

# 1. Prerequisites

Install the following software.

## Required

- Git
- Node.js 20+
- npm
- .NET 8 SDK
- PostgreSQL 16+

## Recommended

- Visual Studio Code
- Visual Studio
- pgAdmin
- Postman
- Docker Desktop

---

# 2. Clone Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd TeamTask
```

---

# 3. PostgreSQL Setup

Create a PostgreSQL database.

Database name:

```text
teamtask
```

Example:

```sql
CREATE DATABASE teamtask;
```

Create a database user if required:

```sql
CREATE USER teamtask_user WITH PASSWORD 'your_password';
```

Grant permissions:

```sql
GRANT ALL PRIVILEGES ON DATABASE teamtask TO teamtask_user;
```

Do not commit database passwords to Git.

---

# 4. Backend Configuration

Navigate to the backend:

```bash
cd backend
```

Restore dependencies:

```bash
dotnet restore
```

Configure the database connection.

Example:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=teamtask;Username=teamtask_user;Password=your_password"
  }
}
```

For local development, use:

```text
appsettings.Development.json
```

Do not commit real production credentials.

---

# 5. Install EF Core Tools

If not already installed:

```bash
dotnet tool install --global dotnet-ef
```

Verify:

```bash
dotnet ef --version
```

---

# 6. Run Database Migrations

From the backend directory:

```bash
dotnet ef database update
```

This creates the required database tables.

---

# 7. Start Backend

```bash
dotnet run
```

Swagger should be available at:

```text
http://localhost:5000/swagger
```

The exact port may vary depending on the ASP.NET Core configuration.

---

# 8. Start Frontend

Open another terminal.

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create the frontend environment file:

```text
.env.local
```

Example:

```text
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# 9. Verify the Application

Verify:

* Backend starts successfully
* Swagger loads
* PostgreSQL connection works
* Database tables exist
* Frontend starts
* Frontend can communicate with backend
* Tasks are displayed
* Task creation works

---

# 10. Common Problems

## PostgreSQL Connection Error

Check:

* PostgreSQL is running
* Port is correct
* Database exists
* Username is correct
* Password is correct
* Connection string is correct

---

## CORS Error

Check the backend CORS configuration.

The frontend development URL should be allowed.

Example:

```text
http://localhost:5173
```

---

## Migration Error

Run:

```bash
dotnet ef migrations list
```

Then:

```bash
dotnet ef database update
```

---

## Frontend Cannot Connect to API

Check:

```text
VITE_API_BASE_URL
```

Example:

```text
VITE_API_BASE_URL=http://localhost:5000/api
```

Restart the Vite development server after changing environment variables.

---

# 11. Production Build

Backend:

```bash
dotnet publish -c Release
```

Frontend:

```bash
npm run build
```

The frontend production files will be generated in:

```text
frontend/dist
```
