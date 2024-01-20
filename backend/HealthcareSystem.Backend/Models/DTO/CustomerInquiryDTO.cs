using System.ComponentModel.DataAnnotations;

namespace HealthcareSystem.Backend.Models.DTO;

public class CustomerInquiryDTO
{
    [Required]
    public string? FullName { get; set; }
    [Required]
    public string? Phone { get; set; }
    [Required]
    public string? Email { get; set; }
    [Required]
    public DateTime? DateQuestion { get; set; }
    [Required]
    public string? Question { get; set; }
    [Required]
    public string? Status { get; set; }
}