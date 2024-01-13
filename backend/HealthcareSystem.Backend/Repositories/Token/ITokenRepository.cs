using Microsoft.AspNetCore.Identity;

namespace HealthcareSystem.Backend.Repositories.Token
{
    public interface ITokenRepository
    {
        string CreateJWTToken(IdentityUser user, List<string> roles);
    }
}
