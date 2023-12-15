using AutoMapper;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories;
using HealthcareSystem.Backend.Repositories.AccountRepository;
using HealthcareSystem.Backend.Repositories.EmailVerificationRepository;
using HealthcareSystem.Backend.Services.EmailService;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HealthcareSystem.Backend.Services.AccountService
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;
        private readonly IEmailVerificationRepository _emailVerificationRepository;
        public AccountService(IAccountRepository temp, IUserRepository userRepository, IMapper mapper, IEmailSender emailSender, IEmailVerificationRepository emailVerificationRepository)
        {
            _accountRepository = temp;
            _userRepository = userRepository;
            _mapper = mapper;
            _emailSender = emailSender;
            _emailVerificationRepository = emailVerificationRepository;
        }



        public Task<AccountBaseDTO> CreateAccountStaff(AccountBaseDTO acc)
        {
            return _accountRepository.CreateAccountStaff(acc);
        }

        public Task<AccountBaseDTO> GetAccountByID(int id)
        {
            return _accountRepository.GetAccountByID(id);
        }

        public async Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO)
        {
            var getList = await _accountRepository.GetUser();
            var checkUser = getList.FirstOrDefault(u => u.Username == loginRequestDTO.UserName);
            if (checkUser == null)
            {
                return new LoginResponseDTO()
                {
                    Token = "User not found",
                    user = null
                };
            }
            if (checkUser.Status == "Disable")
            {
                return new LoginResponseDTO()
                {
                    Token = "User is disable",
                    user = null
                };
            }
            var isPasswordValid = BCrypt.Net.BCrypt.Verify(loginRequestDTO.Password, checkUser.Password);
            if (isPasswordValid == false)
            {
                return new LoginResponseDTO()
                {
                    Token = "Username or password is wrong",
                    user = null
                };
            }
            var userinfo = await _userRepository.GetUserByAccount(checkUser.AccountId);
            if (userinfo == null)
            {
                return new LoginResponseDTO
                {
                    Token = "User not found",
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
                Expires = DateTime.Now.AddDays(7),
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
            var checkUser = await _accountRepository.checkUserExist(registerationRequestDTO.UserName);
            if (checkUser == true)
            {
                return new AccountDTO
                {

                    Status = "User existed"
                };
            }
            var emailChecked = !string.IsNullOrEmpty(registerationRequestDTO.Email) && new EmailAddressAttribute().IsValid(registerationRequestDTO.Email);
            if (emailChecked == false)
            {
                return new AccountDTO
                {

                    Status = "Email is not valid"
                };
            }
            var getID = await _userRepository.GetAsync(u => u.Email == registerationRequestDTO.Email);

            if (getID != null && getID.Email != null)
            {
                return new AccountDTO
                {

                    Status = "Email existed"
                };
            }
            var salt = BCrypt.Net.BCrypt.GenerateSalt();
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerationRequestDTO.Password, salt);
            User new_user = new User()
            {
                Email = registerationRequestDTO.Email
            };
            await _userRepository.CreateAsync(new_user);

            var getIDUser = await _userRepository.GetAsync(u => u.Email == registerationRequestDTO.Email);


            Random random = new Random();

            int randomNumber = random.Next(1000, 10000);

            // Convert the number to a string
            string result = randomNumber.ToString();
            await _emailSender.SendEmailAsync(registerationRequestDTO.Email, "Verify your account !", "Your code is: " + result);

            AccountDTO user = new AccountDTO()
            {
                UserId = getIDUser.UserId,
                Username = registerationRequestDTO.UserName,
                Password = hashedPassword,
                Status = "Disable",
                Role = "Customer"
            };
            var userMapper = _mapper.Map<Models.Entity.Account>(user);
            await _accountRepository.CreateAsync(userMapper);

            var idAccount = await _accountRepository.GetAsync(u => u.Username == registerationRequestDTO.UserName);

            EmailVerification sendEmail = new EmailVerification()
            {
                AccountId = idAccount.AccountId,
                VerifyNumber = Int32.Parse(result)
            };

            await _emailVerificationRepository.CreateAsync(sendEmail);

            user.Password = "";
            user.EmailVerification = result;
            return user;
        }

        public async Task<bool> Verification(int data)
        {
            if (data != null)
            {
                await _accountRepository.UpdateStatus(data);
                return true;
            }
            else
            {
                return false;
            }
        }
        public async Task<AccountBaseDTO> UpdateAccountStaff(AccountBaseDTO acc)
        {
            return await _accountRepository.UpdateAccountStaff(acc);
        }
        public async Task<List<AccountGetDTO>> GetAllAccount()
        {
            return await _accountRepository.GetAllAccount();
        }
        public async Task<AccountBaseDTO> updatePassword(PasswordDTO acc)
        {
            return await _accountRepository.updatePassword(acc);
        }

        public Task<bool> DeleteAccount(int accountId)
        {
            return _accountRepository.DeleteAccount(accountId);
        }
        public Task<int> getAccountIdByUserID(int userid)
        {
            return _accountRepository.getAccountIdByUserID(userid);
        }
    }
}
