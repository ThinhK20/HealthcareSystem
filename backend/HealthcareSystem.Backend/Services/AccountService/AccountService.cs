using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories;
using HealthcareSystem.Backend.Repositories.AccountRepository;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using AutoMapper;

namespace HealthcareSystem.Backend.Services.AccountService
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;


        public AccountService(IAccountRepository temp, IUserRepository userRepository, IMapper mapper)
        {
            _accountRepository = temp;
            _userRepository = userRepository;
            _mapper = mapper;
          
        }
        public async Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO)
        {
            var getList = await _accountRepository.GetUser();
            var checkUser = getList.FirstOrDefault(u => u.Username == loginRequestDTO.UserName);
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
            var isPasswordValid = BCrypt.Net.BCrypt.Verify(loginRequestDTO.Password, checkUser.Password);
            if (isPasswordValid== false) {
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
        public async Task<AccountDTO> Register(RegisterRequestDTO registerationRequestDTO)
        {
            var checkUser =  await _accountRepository.checkUserExist(registerationRequestDTO.UserName);
            if (checkUser == true)
            {
                return null;
            }
            if(registerationRequestDTO.Password != registerationRequestDTO.Password)
            {
                return null;
            }
            var salt = BCrypt.Net.BCrypt.GenerateSalt();
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerationRequestDTO.Password, salt);
            User new_user = new User()
            {
                Email = registerationRequestDTO.Email
            };
            await _userRepository.CreateAsync(new_user);

            var getID = await _userRepository.GetAsync(u => u.Email == registerationRequestDTO.Email);


            AccountDTO user = new AccountDTO()
            {
                UserId = getID.UserId,
                Username = registerationRequestDTO.UserName,
                Password = hashedPassword,
                Status = "Active",
                Role = "Customer"
            };
            var userMapper = _mapper.Map<Models.Entity.Account>(user);
            await _accountRepository.CreateAsync(userMapper);
            user.Password = "";
            return user;
        }
    }
}
