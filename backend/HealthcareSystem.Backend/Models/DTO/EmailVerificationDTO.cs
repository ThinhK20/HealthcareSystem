namespace HealthcareSystem.Backend.Models.DTO
{
    public class EmailVerificationDTO
    {
        public int VerifyNumber { get; set; }

        public int? AccountId { get; set; }
    }
}
