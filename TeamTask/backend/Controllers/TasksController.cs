using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamTask.Api.DTOs;
using TeamTask.Api.Models;
using TeamTask.Api.Repositories;

namespace TeamTask.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskRepository _repository;

        public TasksController(ITaskRepository repository)
        {
            _repository = repository;
        }

        // GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks(
            [FromQuery] string? search,
            [FromQuery] string? status,
            [FromQuery] string? assignee)
        {
            var allTasks = await _repository.GetTasksAsync();
            var query = allTasks.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(t => t.Title.ToLower().Contains(search.ToLower()));
            }

            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(t => t.Status == status);
            }

            if (!string.IsNullOrEmpty(assignee))
            {
                query = query.Where(t => t.Assignee == assignee);
            }

            var tasks = query.OrderBy(t => t.DueDate).ToList();
            return Ok(tasks);
        }

        // GET: api/tasks/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTask(Guid id)
        {
            var task = await _repository.GetTaskAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<TaskItem>> CreateTask(CreateTaskDto dto)
        {
            if (dto.DueDate < DateTime.UtcNow.Date)
            {
                return BadRequest("Due date cannot be in the past.");
            }

            var validStatuses = new[] { "To Do", "In Progress", "Done" };
            if (!validStatuses.Contains(dto.Status))
            {
                return BadRequest("Invalid status.");
            }

            var validPriorities = new[] { "Low", "Medium", "High" };
            if (!validPriorities.Contains(dto.Priority))
            {
                return BadRequest("Invalid priority.");
            }

            var task = new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                Assignee = dto.Assignee,
                Priority = dto.Priority,
                DueDate = dto.DueDate,
                Status = dto.Status,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _repository.CreateTaskAsync(task);

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        // PUT: api/tasks/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(Guid id, CreateTaskDto dto)
        {
            if (dto.DueDate < DateTime.UtcNow.Date)
            {
                return BadRequest("Due date cannot be in the past.");
            }

            var task = await _repository.GetTaskAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            task.Title = dto.Title;
            task.Assignee = dto.Assignee;
            task.Priority = dto.Priority;
            task.DueDate = dto.DueDate;
            task.Status = dto.Status;
            task.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateTaskAsync(task);
            return NoContent();
        }

        // PUT: api/tasks/{id}/status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateTaskStatus(Guid id, UpdateTaskStatusDto dto)
        {
            var validStatuses = new[] { "To Do", "In Progress", "Done" };
            if (!validStatuses.Contains(dto.Status))
            {
                return BadRequest("Invalid status.");
            }

            var task = await _repository.GetTaskAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            task.Status = dto.Status;
            task.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateTaskAsync(task);
            return NoContent();
        }

        // DELETE: api/tasks/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var task = await _repository.GetTaskAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            await _repository.DeleteTaskAsync(id);
            return NoContent();
        }
    }
}
