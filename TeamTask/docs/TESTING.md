# TeamTask Testing Plan

Testing is required before final deployment.

---

# 1. Backend API Testing

Use Swagger or Postman.

---

## Create Task

Test valid request.

Expected:

```text
201 Created
```

---

## Empty Title

Send:

```json
{
  "title": ""
}
```

Expected:

```text
400 Bad Request
```

---

## Past Due Date

Send a date before today.

Expected:

```text
400 Bad Request
```

---

## Invalid Status

Expected:

```text
400 Bad Request
```

---

## Invalid Priority

Expected:

```text
400 Bad Request
```

---

# 2. Get Tasks

Verify:

* All tasks returned
* Tasks sorted by due date

---

# 3. Update Task

Verify:

* Title changes
* Assignee changes
* Priority changes
* Due date changes
* Status changes

---

# 4. Update Status

Test:

```text
To Do
In Progress
Done
```

---

# 5. Delete Task

Verify:

* Existing task can be deleted
* Deleted task no longer appears
* Non-existing task returns 404

---

# 6. Frontend Testing

## Navigation

* [ ] All Tasks opens
* [ ] Add Task opens
* [ ] Navigation works on mobile

---

# 7. Add Task

* [ ] Valid task can be created
* [ ] Empty title rejected
* [ ] Past date rejected
* [ ] Priority works
* [ ] Assignee works
* [ ] Status works

---

# 8. Task List

* [ ] Tasks display
* [ ] Correct information displayed
* [ ] Sorted by due date
* [ ] Responsive layout works

---

# 9. Status

* [ ] To Do
* [ ] In Progress
* [ ] Done

---

# 10. Delete

* [ ] Confirmation appears
* [ ] Cancel works
* [ ] Delete works

---

# 11. Search

* [ ] Search title
* [ ] Case-insensitive search
* [ ] Empty search restores all tasks

---

# 12. Filters

* [ ] Status filter
* [ ] Assignee filter
* [ ] Combined filters
* [ ] Reset filters

---

# 13. Summary

Verify counts update after:

* Creating a task
* Changing status
* Deleting a task

---

# 14. Responsive Testing

Test:

```text
Desktop
Laptop
Tablet
Mobile
```

Check:

* No horizontal scrolling
* Navigation works
* Task cards fit screen
* Forms fit screen
* Buttons remain usable

---

# 15. Production Testing

After deployment, repeat the critical tests against the production URL.

Do not assume local testing guarantees production functionality.

---

# Final QA Checklist

* [ ] Build succeeds
* [ ] API works
* [ ] Database works
* [ ] Frontend works
* [ ] CRUD works
* [ ] Validation works
* [ ] Search works
* [ ] Filtering works
* [ ] Responsive layout works
* [ ] Production deployment works
