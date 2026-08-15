using Microsoft.EntityFrameworkCore;
using TeamTask.Api.Data;
using TeamTask.Api.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure Database
builder.Services.AddDbContext<TaskDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "https://teamtask.vercel.app")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Configure Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

// Seed database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<TaskDbContext>();
    // Attempt to run migrations if a real database is available
    try
    {
        context.Database.Migrate();

        if (!context.Tasks.Any())
        {
            context.Tasks.AddRange(
                new TaskItem { Id = Guid.NewGuid(), Title = "Design Login Page", Assignee = "Sarah", Priority = "High", DueDate = DateTime.UtcNow.AddDays(2), Status = "To Do", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new TaskItem { Id = Guid.NewGuid(), Title = "Create Dashboard", Assignee = "John", Priority = "Medium", DueDate = DateTime.UtcNow.AddDays(5), Status = "In Progress", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new TaskItem { Id = Guid.NewGuid(), Title = "Implement API", Assignee = "Alex", Priority = "High", DueDate = DateTime.UtcNow.AddDays(1), Status = "In Progress", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new TaskItem { Id = Guid.NewGuid(), Title = "Write Unit Tests", Assignee = "Emma", Priority = "Medium", DueDate = DateTime.UtcNow.AddDays(7), Status = "To Do", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new TaskItem { Id = Guid.NewGuid(), Title = "Prepare Documentation", Assignee = "David", Priority = "Low", DueDate = DateTime.UtcNow.AddDays(10), Status = "Done", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
            );
            context.SaveChanges();
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine("Could not migrate or seed database. PostgreSQL might not be running. Error: " + ex.Message);
    }
}

app.Run();
