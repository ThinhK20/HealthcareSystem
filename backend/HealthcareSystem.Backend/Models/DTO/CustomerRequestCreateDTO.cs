namespace HealthcareSystem.Backend.Models.DTO
{
    public class CustomerRequestCreateDTO
    {
        public int AccountId { get; set; }
        public int PackageId { get; set; }
        public DateTime DateRequest { get; set; }
        public string Periodic { get; set; }
    }
}
