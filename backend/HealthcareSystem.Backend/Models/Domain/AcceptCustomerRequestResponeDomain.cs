namespace HealthcareSystem.Backend.Models.Domain
{
    public class AcceptCustomerRequestResponeDomain
    {
        public int? packageId { get; set; }
        public int? accountId { get; set; }
        public DateTime? acceptAt { get; set; }
    }
}
