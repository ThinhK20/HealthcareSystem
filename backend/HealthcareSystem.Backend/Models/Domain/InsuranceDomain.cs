namespace HealthcareSystem.Backend.Models.Domain
{
    public class InsuranceDomain
    {
        public int InsuranceID { get; set; }
        public string RegisterPlace { get; set; }
        public string CardOpenDate { get; set; }
        public string AccountId { get; set; }
        public Account? Account { get; set; } = new();
        public List<InsuranceDetailDomain>? InsuranceDetails { get; set; } = new();
    }
}
