using AutoMapper;
using Azure;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Services.AccountService;
using HealthcareSystem.Backend.Services.UserService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace HealthcareSystem.Backend.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        public AccountController(IAccountService accountService, IMapper mapper, IUserService userService)
        {
            _accountService = accountService;
            _mapper = mapper;
            _userService = userService;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO model)
        {
            var userLogin = await _accountService.Login(model);
            if (userLogin.user == null)
            {
                return Ok(userLogin.Token);
            }

            return Ok(userLogin);
        }



        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO model)
        {
            var user = await _accountService.Register(model);
            if (user.EmailVerification == null)
            {
                return Ok(user.Status);
            }
            return Ok(user);

        }
        [HttpPost("verification")]
        public async Task<IActionResult> Verify([FromBody] int model)
        {
            var user = await _accountService.Verification(model);
            if (user == false)
            {
                return BadRequest();
            }
            return Ok("Successfully");

        }         
        [HttpPost("create-new-staff")]
        public async Task<IActionResult> CreateAccountStaff([FromBody] AccountUserDTO account)
        {
            if (account == null)
            {
                return BadRequest();
            }
       
            UserDTO userCreate = new UserDTO
            {
                Fullname = account.Fullname,
                Email = account.Email,
                CCCD = account.CCCD,
                Phone = account.Phone,
                Birthdate = account.Birthdate,
                Address = account.Address,
                Gender = account.Gender,
            };
            var tempUser = await _userService.CreateUser(userCreate);
            if (tempUser == null)
            {
                return BadRequest("Failed to create user.");
            }

            AccountBaseDTO accCreate = new AccountBaseDTO
            {
                UserId = tempUser.UserId,
                Username = account.Username,
                Password = account.Password,
                Status = account.Status,
                Role = account.Role
            };
            var tempAccount = await _accountService.CreateAccountStaff(accCreate);
            if (tempAccount == null)
            {
                return BadRequest("Failed to create account.");
            }

            return Ok(tempAccount);
        }
        [HttpPut("edit-account-staff")]
        public async Task<IActionResult> EditUser([FromBody] AccountBaseDTO account)
        {

            AccountBaseDTO accCreate = new AccountBaseDTO
            {
                AccountId = account.AccountId,
                UserId = account.UserId,
                Username = account.Username,
                Password = account.Password,
                Status = account.Status,
                Role = account.Role
            };
            var tempAccount = await _accountService.UpdateAccountStaff(accCreate);
            if (tempAccount == null)
            {
                return BadRequest("Failed to create account.");
            }

            return Ok(tempAccount);
        }
        [HttpPut("edit-user-staff")]
        public async Task<IActionResult> EditAccount([FromBody] UserDTO account)
        {
            UserDTO userCreate = new UserDTO
            {
                UserId = account.UserId,
                Fullname = account.Fullname,
                Email = account.Email,
                CCCD = account.CCCD,
                Phone = account.Phone,
                Birthdate = account.Birthdate,
                Address = account.Address,
                Gender = account.Gender,
            };
            var tempAccount = await _userService.UpdateUser(userCreate);
            if (tempAccount == null)
            {
                return BadRequest("Failed to create account.");
            }

            return Ok(tempAccount);
        }
        [HttpPut("change-password")]
        public async Task<IActionResult> changePass([FromBody] PasswordDTO account)
        {
            var changePass = await _accountService.updatePassword(account);
 
            if (changePass == null)
            {
                return BadRequest("Failed to create account.");
            }

            return Ok(changePass);
        }
        [HttpGet("get-account-staff")]
        public async Task<IActionResult> getAccount(int AccountID)
        {
           
            var tempAccount = await _accountService.GetAccountByID(AccountID);
            if (tempAccount == null)
            {
                return BadRequest("Failed to create account.");
            }

            return Ok(tempAccount);
        }
        [HttpGet("get-user-staff")]
        public async Task<IActionResult> getUser(int AccountID)
        {

            var tempAccount = await _userService.GetUserByAccount(AccountID);
            if (tempAccount == null)
            {
                return BadRequest("Failed to create account.");
            }

            return Ok(tempAccount);
        }
    }
}
