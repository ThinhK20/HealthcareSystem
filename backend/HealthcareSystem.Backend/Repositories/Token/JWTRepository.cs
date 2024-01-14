using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HealthcareSystem.Backend.Repositories.Token
{
    public class JWTRepository : ITokenRepository
    {
        private readonly IConfiguration configuration;

        public JWTRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string CreateJWTToken(IdentityUser user, List<string> roles)
        {
            // Create claim
            var claim = new List<Claim>();
            claim.Add(new Claim(ClaimTypes.Name, user.UserName));

            foreach (var role in roles)
            {
                claim.Add(new Claim(ClaimTypes.Role, role));
            }

            // create key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:Key"]));

            // create credentials 
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // create token

            var token = new JwtSecurityToken(configuration["JwtSettings:Issuer"],
                configuration["JwtSettings:Audience"],
                claim,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
