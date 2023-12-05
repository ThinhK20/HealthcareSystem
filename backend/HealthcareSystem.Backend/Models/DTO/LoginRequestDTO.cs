using HealthcareSystem.Backend.Models.Domain;

namespace HealthcareSystem.Backend.Models.DTO
{
    public class LoginRequestDTO
    {
        public string UserName { get; set; }
        public string Password { get; set; }

    }
}
