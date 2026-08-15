using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using TeamTask.Api.Controllers;
using TeamTask.Api.Data;
using TeamTask.Api.DTOs;
using TeamTask.Api.Models;
using Xunit;

namespace TeamTask.Api.Tests
{
    public class TasksControllerTests
    {
        private TaskDbContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<TaskDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var context = new TaskDbContext(options);
            context.Database.EnsureCreated();
            return context;
        }

        [Fact]
        public async Task CreateTask_ValidTask_ReturnsCreated()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TasksController(context);
            var dto = new CreateTaskDto
            {
                Title = "Test Task",
                Assignee = "John",
                Priority = "High",
                DueDate = DateTime.UtcNow.AddDays(1),
                Status = "To Do"
            };

            // Act
            var result = await controller.CreateTask(dto);

            // Assert
            var actionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var task = Assert.IsType<TaskItem>(actionResult.Value);
            Assert.Equal("Test Task", task.Title);
        }

        [Fact]
        public async Task CreateTask_PastDueDate_ReturnsBadRequest()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TasksController(context);
            var dto = new CreateTaskDto
            {
                Title = "Test Task",
                Assignee = "John",
                Priority = "High",
                DueDate = DateTime.UtcNow.AddDays(-1),
                Status = "To Do"
            };

            // Act
            var result = await controller.CreateTask(dto);

            // Assert
            var actionResult = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal("Due date cannot be in the past.", actionResult.Value);
        }
    }
}
