using System.ComponentModel.DataAnnotations;

namespace TeamTask.Api.DTOs
{
    public class UpdateTaskStatusDto
    {
        [Required]
        [MaxLength(20)]
        public string Status { get; set; } = string.Empty;
    }
}
