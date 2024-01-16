using HealthcareSystem.Backend.Models.Entity;

namespace HealthcareSystem.Backend.Models.Domain;

public class RefundDetailDomain
{
    public int RefundDetailID { get; set; }
    public int RefundID { get; set; }
    public int PolicyId { get; set; }
    public string Description { get; set; } = "";
    public double RefundFee { get; set; }
    public double PaidFee { get; set; }
    public RefundRequest RefundRequest { get; set; } = new();
    public InsurancePolicy InsurancePolicy { get; set; } = new();
}