# TeamTask Deployment Guide

This document explains how to deploy TeamTask to production.

---

# Production Architecture

```text
                 Internet
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
      React App          ASP.NET Core API
       Vercel             Render / Azure
                              │
                              ▼
                         PostgreSQL
                       Neon / Render /
                            Azure
```

---

# 1. Production Database

Create a PostgreSQL database using the selected hosting provider.

Obtain the production connection string.

Example format:

```text
Host=...
Port=5432
Database=...
Username=...
Password=...
SSL Mode=Require
```

Do not commit this value to GitHub.

---

# 2. Backend Environment Variables

Configure:

```text
ConnectionStrings__DefaultConnection
```

Example:

```text
ConnectionStrings__DefaultConnection=<PRODUCTION_CONNECTION_STRING>
```

---

# 3. Run Production Migration

The production database must contain the required schema.

Run:

```bash
dotnet ef database update
```

or use the deployment migration strategy configured by the team.

---

# 4. Backend Build

Run locally:

```bash
dotnet restore
dotnet build
dotnet test
dotnet publish -c Release
```

All commands should complete successfully.

---

# 5. Deploy Backend

Recommended options:

* Render
* Microsoft Azure
* Railway

Configure:

```text
Build Command:
dotnet publish -c Release -o out

Start Command:
dotnet out/TeamTask.Api.dll
```

The exact command depends on the project configuration and hosting platform.

---

# 6. Configure CORS

The production frontend URL must be allowed by the backend.

Example:

```text
https://teamtask.vercel.app
```

Do not allow unrestricted origins in production.

Avoid:

```text
AllowAnyOrigin
```

unless there is a specific reason to use it.

---

# 7. Frontend Environment Variable

Create:

```text
VITE_API_BASE_URL
```

Example:

```text
VITE_API_BASE_URL=https://your-api-domain.com/api
```

---

# 8. Frontend Production Build

Run:

```bash
npm install
npm run build
```

The production files will be generated in:

```text
dist/
```

---

# 9. Deploy Frontend

Recommended platform:

```text
Vercel
```

Configure:

```text
Framework:
Vite

Build Command:
npm run build

Output Directory:
dist
```

Add:

```text
VITE_API_BASE_URL
```

to the Vercel environment variables.

---

# 10. Production Verification

After deployment:

1. Open frontend.
2. Create a task.
3. Verify task appears.
4. Change status.
5. Verify status changes.
6. Search task.
7. Filter task.
8. Delete task.
9. Refresh browser.
10. Verify data still exists.

---

# 11. Deployment Security

Never commit:

```text
.env
.env.local
production passwords
database credentials
API keys
private keys
```

Use:

* Vercel environment variables
* Render environment variables
* Azure App Settings
* PostgreSQL provider secrets

---

# 12. Production Checklist

* [ ] Database deployed
* [ ] Database migration applied
* [ ] Backend deployed
* [ ] Backend can connect to database
* [ ] CORS configured
* [ ] Frontend deployed
* [ ] API URL configured
* [ ] HTTPS enabled
* [ ] CRUD tested
* [ ] Search tested
* [ ] Filtering tested
* [ ] Mobile tested
