namespace HealthcareSystem.Backend.Models.DTO
{
    public class InsuarancePolicyCreateDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public double PayoutPercentage { get; set; }
        public double MaxRefund { get; set; }
    }
}
