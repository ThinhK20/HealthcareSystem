using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories;
using HealthcareSystem.Backend.Repositories.AccountRepository;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HealthcareSystem.Backend.Services.AccountService
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IUserRepository _userRepository;


        public AccountService(IAccountRepository temp, IUserRepository userRepository)
        {
            _accountRepository = temp;
            _userRepository = userRepository;
          
        }
        public async Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO)
        {
            var getList = await _accountRepository.GetUser();
            var checkUser = getList.FirstOrDefault(u => u.Username == loginRequestDTO.UserName && u.Password == loginRequestDTO.Password);
            if (checkUser == null)
            {
                return new LoginResponseDTO()
                {
                    Token = "",
                    user = null
                };
            }
            if(checkUser.Status == "Disable")
            {
                return new LoginResponseDTO()
                {
                    Token = "",
                    user = null
                };
            }
            var userinfo = await _userRepository.GetUserByAccount(checkUser.AccountId);
            if (userinfo == null)
            {
                return new LoginResponseDTO
                {
                    Token = "",
                    user = null
                };
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("This is Secret Key of Project PTHTTTHD");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
               {
                    new Claim(ClaimTypes.Name, checkUser.UserId.ToString()),
                    new Claim(ClaimTypes.Role, checkUser.Role)
               }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            
            LoginResponseDTO loginRequestDto = new LoginResponseDTO()
            {
                Token = tokenHandler.WriteToken(token),
                user = userinfo
            };
            return loginRequestDto;
        }
    }
}
