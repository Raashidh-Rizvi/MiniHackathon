using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TeamTask.Api.Models;

namespace TeamTask.Api.Repositories
{
    public interface ITaskRepository
    {
        Task<IEnumerable<TaskItem>> GetTasksAsync();
        Task<TaskItem?> GetTaskAsync(Guid id);
        Task CreateTaskAsync(TaskItem task);
        Task UpdateTaskAsync(TaskItem task);
        Task DeleteTaskAsync(Guid id);
    }
}
