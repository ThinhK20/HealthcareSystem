using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthcareSystem.Backend.Models.Entity
{
    public class CustomerRequest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RequestID { get; set; }
        public int? AccountId { get; set; }
        public int? StaffId { get; set; }
        public int? PackageId { get; set; }
        public int? PaymentId { get; set; }
        public DateTime? DateRequest { get; set; }
        public DateTime? DateAccept { get; set; }
        public string? Periodic { get; set; }
        public float? Price { get; set; }
        public virtual Account? Account { get; set; }
        public virtual  Account? Staff { get; set; }
        public virtual  Payment? Payment { get; set; }
        public virtual PolicyPackage? PolicyPackage { get; set; }
    }
}
