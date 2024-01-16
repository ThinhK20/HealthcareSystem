using HealthcareSystem.Backend.Models.Domain;

namespace HealthcareSystem.Backend.Models.DTO
{
    public class UserGoogleDTO
    {
        public string Status { get; set; }
        public string token { get; set; }
        
        public UserDomain user { get; set; }
    }
}
