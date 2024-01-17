namespace HealthcareSystem.Backend.Models.DTO;

public class CustomerInquiryDTO
{
    public string? FullName { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }

    public DateTime? DateQuestion { get; set; }
    public string? Question { get; set; }
    public string? Status { get; set; }
}