using HealthcareSystem.Backend.Models.DTO;

namespace HealthcareSystem.Backend.Models.Domain
{
    public class CustomerRequestDomain
    {
        public int RequestID { get; set; }
        public int AccountId { get; set; }
        public int StaffId { get; set; }
        public int PackageId { get; set; }
        public int PaymentId { get; set; }
        public DateTime DateRequest { get; set; }
        public DateTime DateAccept { get; set; }
        public string Periodic { get; set; }
        public float Price { get; set; }
        public string Status {  get; set; }
        public AccountDTO? Account { get; set; } = new();
        public AccountDTO? Staff { get; set; } = new();
        public PaymentDomain? Payment { get; set; } = new();
        public PolicyPackageDomain? PolicyPackage { get; set; } = new();

    }
}
