using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;

namespace HealthcareSystem.Backend.Models.Domain
{
    public class PaymentDomain
    {
        public int PaymentId { get; set; }
        public int? RequestId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public double? Price { get; set; }
        public bool? Status { get; set; }
        public CustomerRequestDTO? CustomerRequest { get; set; } = new();

    }
}
