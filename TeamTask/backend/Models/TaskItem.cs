using System.ComponentModel.DataAnnotations;

namespace TeamTask.Api.Models
{
    public class TaskItem
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Assignee { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string Priority { get; set; } = string.Empty; // Low, Medium, High

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        [MaxLength(20)]
        public string Status { get; set; } = string.Empty; // To Do, In Progress, Done

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
