using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using TeamTask.Api.Models;

namespace TeamTask.Api.Repositories
{
    public class FileTaskRepository : ITaskRepository
    {
        private readonly string _filePath;

        public FileTaskRepository()
        {
            _filePath = Path.Combine(Directory.GetCurrentDirectory(), "database.txt");
        }

        private async Task<List<TaskItem>> ReadTasksAsync()
        {
            if (!File.Exists(_filePath))
            {
                return await SeedTasksAsync();
            }

            var json = await File.ReadAllTextAsync(_filePath);
            if (string.IsNullOrWhiteSpace(json))
            {
                return await SeedTasksAsync();
            }

            return JsonSerializer.Deserialize<List<TaskItem>>(json) ?? new List<TaskItem>();
        }

        private async Task<List<TaskItem>> SeedTasksAsync()
        {
            var seedTasks = new List<TaskItem>
            {
                new TaskItem { Id = Guid.NewGuid(), Title = "Design Login Page", Assignee = "Sarah", Priority = "High", DueDate = DateTime.UtcNow.AddDays(2), Status = "Done", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new TaskItem { Id = Guid.NewGuid(), Title = "Setup PostgreSQL Database", Assignee = "Mike", Priority = "High", DueDate = DateTime.UtcNow.AddDays(1), Status = "Done", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new TaskItem { Id = Guid.NewGuid(), Title = "Build React Dashboard", Assignee = "Alex", Priority = "Medium", DueDate = DateTime.UtcNow.AddDays(3), Status = "In Progress", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new TaskItem { Id = Guid.NewGuid(), Title = "Write Unit Tests", Assignee = "Sarah", Priority = "Medium", DueDate = DateTime.UtcNow.AddDays(5), Status = "To Do", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new TaskItem { Id = Guid.NewGuid(), Title = "Deploy to Vercel", Assignee = "Alex", Priority = "Low", DueDate = DateTime.UtcNow.AddDays(7), Status = "To Do", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
            };

            await WriteTasksAsync(seedTasks);
            return seedTasks;
        }

        private async Task WriteTasksAsync(List<TaskItem> tasks)
        {
            var json = JsonSerializer.Serialize(tasks, new JsonSerializerOptions { WriteIndented = true });
            await File.WriteAllTextAsync(_filePath, json);
        }

        public async Task<IEnumerable<TaskItem>> GetTasksAsync()
        {
            return await ReadTasksAsync();
        }

        public async Task<TaskItem?> GetTaskAsync(Guid id)
        {
            var tasks = await ReadTasksAsync();
            return tasks.FirstOrDefault(t => t.Id == id);
        }

        public async Task CreateTaskAsync(TaskItem task)
        {
            var tasks = await ReadTasksAsync();
            tasks.Add(task);
            await WriteTasksAsync(tasks);
        }

        public async Task UpdateTaskAsync(TaskItem task)
        {
            var tasks = await ReadTasksAsync();
            var index = tasks.FindIndex(t => t.Id == task.Id);
            if (index != -1)
            {
                tasks[index] = task;
                await WriteTasksAsync(tasks);
            }
        }

        public async Task DeleteTaskAsync(Guid id)
        {
            var tasks = await ReadTasksAsync();
            var taskToRemove = tasks.FirstOrDefault(t => t.Id == id);
            if (taskToRemove != null)
            {
                tasks.Remove(taskToRemove);
                await WriteTasksAsync(tasks);
            }
        }
    }
}
