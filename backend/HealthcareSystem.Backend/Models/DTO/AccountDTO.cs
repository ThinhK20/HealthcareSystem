namespace HealthcareSystem.Backend.Models.DTO
{
    public class AccountDTO
    {
        public int AccountId { get; set; }
        public int UserId { get; set; }

        public string Username { get; set; }

        public string Status { get; set; }

        public string Role { get; set; }
    }
}
