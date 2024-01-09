namespace HealthcareSystem.Backend.Models.DTO
{
    public class PackagePolicyEditDTO
    {
        public int Packageid {  get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<PackageDetailEditDTO> PackageDetails { get; set; } = new List<PackageDetailEditDTO>();
        public List<BasicPriceEditDTO> BasicPrices { get; set; } = new List<BasicPriceEditDTO>();

    }
}
