namespace HealthcareSystem.Backend.Models.DTO
{
    public class CustomerRequestCreateDTO
    {
        public int AccountId { get; set; }
        public int StaffId { get; set; }
        public int PackageId { get; set; }
        public int PaymentId { get; set; }
        public DateTime DateRequest { get; set; }
        public DateTime DateAccept { get; set; }
        public string Periodic { get; set; }
        public float Price { get; set; }
    }
}
