

namespace HealthcareSystem.Backend.Models.DTO
{
    public class PaymentCreateDTO
    {
        public required int RequestId { get; set; }
        public float Price { get; set; }
        public DateTime CreatedDate { get; set; }
    }

}
