namespace HealthcareSystem.Backend.Models.DTO
{
    public class PackagePolicyCreateDTO
    {
        public string name {  get; set; }
        public string Description { get; set; }
        public List<PackageDetailCreateDTO> packageDetailCreates { get; set; }
        public List<BasicPriceCreateDTO> basicPriceCreates { get; set; }
    }
}
