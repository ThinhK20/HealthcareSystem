

namespace HealthcareSystem.Backend.Models.DTO
{
    public class PaymentCreateDTO
    {
        public required int RequestId { get; set; }
        public double Price { get; set; }
    }
}
