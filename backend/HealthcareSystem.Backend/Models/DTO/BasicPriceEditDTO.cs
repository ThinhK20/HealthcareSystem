namespace HealthcareSystem.Backend.Models.DTO
{
    public class BasicPriceEditDTO
    {
        public int PackageID { get; set; }
        public int IndexId { get; set; }
        public int FromAge { get; set; }
        public int ToAge { get; set; }
        public string Gender { get; set; }
        public double Price { get; set; }
    }
}
