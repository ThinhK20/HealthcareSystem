namespace HealthcareSystem.Backend.Models.Domain
{
    public class PolicyPackageDomain
    {
        public int Packageid { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public List<PackageDetailDomain> PackageDetails { get; set; } = new List<PackageDetailDomain>();
        public List<BasicPriceDomain> BasicPrices { get; set; } = new List<BasicPriceDomain>();
    }
}
