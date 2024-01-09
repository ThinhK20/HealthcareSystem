namespace HealthcareSystem.Backend.Models.Domain
{
    public class InsurancePolicyDomain
    {
        public int policyID { get; set; }
        public string? name { get; set; }
        public string? description { get; set; }
        public List<PackageDetailDomain> packageDetailsDomain { get; set; } = new List<PackageDetailDomain>();

        public List<RefundRequestDomain> refundRequestsDomain { get; set;} = new List<RefundRequestDomain>();
    }
}
