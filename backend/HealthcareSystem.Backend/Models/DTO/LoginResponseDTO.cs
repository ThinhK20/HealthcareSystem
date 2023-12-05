using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.Entity;

namespace HealthcareSystem.Backend.Models.DTO
{
    public class LoginResponseDTO
    {
        public UserDomain user { get; set; }
        public string Token { get; set; }
    }
}
