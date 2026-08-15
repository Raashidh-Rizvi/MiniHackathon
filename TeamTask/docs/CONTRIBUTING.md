# TeamTask Contribution Guidelines

All team members should contribute meaningful code, documentation, testing, or project work through Git.

---

# Branch Strategy

The main branch is:

```text
main
```

Feature branches should follow:

```text
feature/<feature-name>
```

Examples:

```text
feature/task-api
feature/task-form
feature/task-filter
feature/task-summary
feature/responsive-ui
```

Bug fixes:

```text
fix/<bug-name>
```

Examples:

```text
fix/past-date-validation
fix/api-cors
```

---

# Development Workflow

Before starting work:

```bash
git checkout main
git pull origin main
```

Create a branch:

```bash
git checkout -b feature/task-form
```

Implement the feature.

Check the application:

```bash
npm run build
```

or:

```bash
dotnet build
```

Commit:

```bash
git add .
git commit -m "feat: add task creation form"
```

Push:

```bash
git push origin feature/task-form
```

Create a Pull Request.

---

# Commit Convention

Use meaningful commit messages.

Format:

```text
type: description
```

Types:

```text
feat
fix
docs
style
refactor
test
chore
```

Examples:

```text
feat: implement task creation API
feat: add task filtering
feat: add responsive task cards
fix: prevent past due dates
test: add task API validation tests
docs: update deployment instructions
refactor: separate task service from controller
chore: update dependencies
```

---

# Avoid Bad Commits

Do not use:

```text
update
changes
final
test
stuff
done
final2
```

Commit messages should explain what changed.

---

# Pull Requests

Every Pull Request should contain:

## Description

Explain what was implemented.

## Testing

Explain how the feature was tested.

## Screenshots

Include screenshots for major UI changes.

## Checklist

* [ ] Feature works
* [ ] No build errors
* [ ] No console errors
* [ ] Tests pass
* [ ] Documentation updated if necessary

---

# Code Review

At least one other group member should review significant changes before merging.

Check:

* Correctness
* Readability
* Validation
* Error handling
* Responsive design
* Security
* No unnecessary code

---

# Main Branch Rule

The `main` branch should always contain working code.

Do not push unfinished or broken features directly to `main`.

---

# Group Contributions

Each group member should have meaningful contributions.

Examples:

```text
Member 1
Backend API
EF Core
Database

Member 2
React UI
Navigation
Task Form

Member 3
Filtering
Search
Task Summary

Member 4
Testing
Responsive Design
Deployment
Documentation
```

The exact distribution should reflect the actual work completed by each member.

---

# Before Final Submission

Run:

```bash
git pull origin main
```

Then verify:

```bash
dotnet build
dotnet test
npm run build
```

Confirm:

* All features work
* All members have Git contributions
* README is complete
* Deployment works
* Production URL works
