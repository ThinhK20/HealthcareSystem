namespace HealthcareSystem.Backend.Models.DTO;

public class CreateRefundDetailDTO
{
    public int RefundID { get; set; }
    public int PolicyId { get; set; }
    public string Description { get; set; } = "";
    public double PaidFee { get; set; }
}