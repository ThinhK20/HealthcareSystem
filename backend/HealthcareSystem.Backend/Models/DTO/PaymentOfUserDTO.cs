namespace HealthcareSystem.Backend.Models.DTO
{
    public class PaymentOfUserDTO
    {

        public int PaymentId { get; set; }
        public int RequestId { get; set; }

        public DateTime? CreatedDate { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public double? Price { get; set; }
        public bool? Status { get; set; }

    }
}
