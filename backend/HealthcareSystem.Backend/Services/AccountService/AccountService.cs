﻿using AutoMapper;
using HealthcareSystem.Backend.Enums;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories;
using HealthcareSystem.Backend.Repositories.AccountRepository;
using HealthcareSystem.Backend.Repositories.EmailVerificationRepository;
using HealthcareSystem.Backend.Repositories.InsuranceDetailRepository;
using HealthcareSystem.Backend.Repositories.InsuranceRepository;
using HealthcareSystem.Backend.Repositories.Token;
using HealthcareSystem.Backend.Services.EmailService;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ITokenRepository _tokenRepository;
        private readonly IInsuranceRepository _insuranceRepository;
        private readonly IInsuranceDetailRepository _insuranceDetailRepository;

        public AccountService(IAccountRepository temp, IUserRepository userRepository, IMapper mapper, IEmailSender emailSender, IEmailVerificationRepository emailVerificationRepository, UserManager<IdentityUser> userManager, ITokenRepository tokenRepository, IInsuranceRepository insuranceRepository, IInsuranceDetailRepository insuranceDetailRepository)
        {
            _accountRepository = temp;
            _userRepository = userRepository;
            _mapper = mapper;
            _emailSender = emailSender;
            _emailVerificationRepository = emailVerificationRepository;
            _userManager = userManager;
            _tokenRepository = tokenRepository;
            _insuranceRepository = insuranceRepository;
            _insuranceDetailRepository = insuranceDetailRepository;
        }
        public async Task<List<Models.Domain.Account>> GetAccountsByPage(int pageSize, int pageNumber)
        {
            return await _accountRepository.GetAccountsByPage(pageSize, pageNumber);
        }
        public async Task<AccountBaseDTO> CreateAccountStaff(AccountBaseDTO acc,string email)
        {
            var result = await _accountRepository.CreateAccountStaff(acc, email);
            if(result.Role == "User")
            {
                var insuranceCardData = new InsuranceDTO()
                {
                    AccountId = result.AccountId,
                    CardOpenDate = DateTime.Today.ToString("yyyy-M-d"),
                    RegisterPlace = "Ho Chi Minh"
                };

                await _insuranceRepository.CreateInsurance(insuranceCardData);
            }
            return result;
        }

        public async Task<AccountBaseDTO> GetAccountByID(int id)
        {
            return await _accountRepository.GetAccountByID(id);
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
            //var tokenHandler = new JwtSecurityTokenHandler();
            //var key = Encoding.UTF8.GetBytes("This is Secret Key of Project PTHTTTHD");
            //var tokenDescriptor = new SecurityTokenDescriptor
            //{
            //    Subject = new ClaimsIdentity(new Claim[]
            //   {
            //        new Claim(ClaimTypes.Name, checkUser.UserId.ToString()),
            //        new Claim(ClaimTypes.Role, checkUser.Role)
            //   }),
            //    Expires = DateTime.Now.AddDays(7),
            //    SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            //};

            //var token = tokenHandler.CreateToken(tokenDescriptor);


            var user = await _userManager.FindByNameAsync(loginRequestDTO.UserName);
            var roles = await _userManager.GetRolesAsync(user);
            var jwtToken = _tokenRepository.CreateJWTToken(user, roles.ToList());

            LoginResponseDTO loginRequestDto = new LoginResponseDTO()
            {
                Token = jwtToken,
                user = userinfo
            };
            return loginRequestDto;
        }

        public async Task<LoginResponseDTO> createAccountForGoogleLogin(RegisterRequestDTO loginRequestDTO)
        {
            var salt = BCrypt.Net.BCrypt.GenerateSalt();
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(loginRequestDTO.Password, salt);
            var getIDUser = await _userRepository.GetAsync(u => u.Email == loginRequestDTO.Email);
         
            AccountDTO user = new AccountDTO()
            {
                UserId = getIDUser.UserId,
                Username = loginRequestDTO.UserName,
                Password = hashedPassword,
                Status = "Active",
                Role = "User"
            };
            var userMapper = _mapper.Map<Models.Entity.Account>(user);
            await _accountRepository.CreateAsync(userMapper);

            //var tokenHandler = new JwtSecurityTokenHandler();
            //var key = Encoding.UTF8.GetBytes("This is Secret Key of Project PTHTTTHD");
            //var tokenDescriptor = new SecurityTokenDescriptor
            //{
            //    Subject = new ClaimsIdentity(new Claim[]
            //   {
            //        new Claim(ClaimTypes.Name, user.UserId.ToString()),
            //        new Claim(ClaimTypes.Role, user.Role)
            //   }),
            //    Expires = DateTime.Now.AddDays(7),
            //    SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            //};

            //var token = tokenHandler.CreateToken(tokenDescriptor);
            var identityUser = new IdentityUser
            {
                UserName = loginRequestDTO.UserName,
                Email = loginRequestDTO.Email
            };
            var identityResult = await _userManager.CreateAsync(identityUser, loginRequestDTO.Password);
            await _userManager.AddToRolesAsync(identityUser, new List<string> { Roles.UserRole });

            var userIdentity = await _userManager.FindByEmailAsync(loginRequestDTO.Email);
            var roles = await _userManager.GetRolesAsync(userIdentity);
            var jwtToken = _tokenRepository.CreateJWTToken(userIdentity, roles.ToList());

            var getList = await _accountRepository.GetUser();
            var checkUser = getList.FirstOrDefault(u => u.Username == loginRequestDTO.UserName);
            var userinfo = await _userRepository.GetUserByAccount(checkUser.AccountId);

            var insuranceCardData = new InsuranceDTO()
            {
                AccountId = checkUser.AccountId,
                CardOpenDate = DateTime.Today.ToString("yyyy-M-d"),
                RegisterPlace = "Ho Chi Minh"
            };

            await _insuranceRepository.CreateInsurance(insuranceCardData);

            LoginResponseDTO loginRequestDto = new LoginResponseDTO()
            {
                Token = jwtToken,
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


            //Add data to auth database
            var identityUser = new IdentityUser
            {
                UserName = registerationRequestDTO.UserName,
                Email = registerationRequestDTO.Email
            };

            var identityResult = await _userManager.CreateAsync(identityUser, registerationRequestDTO.Password);
            await _userManager.AddToRolesAsync(identityUser, new List<string> { Roles.UserRole });
            var getIDUser = await _userRepository.GetAsync(u => u.Email == registerationRequestDTO.Email);


            Random random = new Random();

            int randomNumber = random.Next(1000, 10000);

            // Convert the number to a string
            string result = randomNumber.ToString();
            //await _emailSender.SendEmailAsync(registerationRequestDTO.Email, "Verify your account !", "Your code is: " + result);

            AccountDTO user = new AccountDTO()
            {
                UserId = getIDUser.UserId,
                Username = registerationRequestDTO.UserName,
                Password = hashedPassword,
                Status = "Active",
                Role = Roles.UserRole
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

            var insuranceCardData = new InsuranceDTO()
            {
                AccountId = idAccount.AccountId,
                CardOpenDate = DateTime.Today.ToString("yyyy-M-d"),
                RegisterPlace = "Ho Chi Minh"
            };

            await _insuranceRepository.CreateInsurance(insuranceCardData);

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

        public async Task<LoginResponseDTO> loginByGoogle(string email)
        {
            var userCheck = await _userRepository.GetUserByEmail(email);
            if (userCheck == null)
            {
                throw new Exception("No User info");
            }
            var accountCheck = await GetAccountByID(userCheck.UserId);
            if (accountCheck == null)
            {
                throw new Exception("No User info");
            }
            if (accountCheck.Username.StartsWith("user_") == false)
            {
                throw new Exception("Account not create by Login Google method");
            }

            var user = await _userManager.FindByEmailAsync(email);
            var roles = await _userManager.GetRolesAsync(user);
            var jwtToken = _tokenRepository.CreateJWTToken(user, roles.ToList());
            var userinfo = _mapper.Map<Models.Domain.UserDomain>(userCheck);
            LoginResponseDTO loginRequestDto = new LoginResponseDTO()
            {
                Token = jwtToken,
                user = userinfo
            };
            return loginRequestDto;
        }

        public async Task<object> getInsuranceDetailsByAccountId(int accountId)
        {
            var insuranceData = await _insuranceRepository.GetInsuranceByAccountIdAsync(accountId);
            if (insuranceData == null) throw new Exception("Dont find account");
            var listPackageOfInsuranceData = await _insuranceDetailRepository.GetDetailByIdAsync(insuranceData.InsuranceID);
            
            var dataReturn = new 
            {
                insuranceInfo = insuranceData,
                listPackage = listPackageOfInsuranceData
            };
            return dataReturn;
        }
    }
}
