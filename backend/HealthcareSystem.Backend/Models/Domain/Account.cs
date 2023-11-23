namespace HealthcareSystem.Backend.Models.Domain
{
    public class Account
    {
        public int AccountId { get; set; }
        public int UserId { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Status { get; set; }

        public string Role { get; set; }

    }
}
