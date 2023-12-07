using AutoMapper;
using Azure;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Services.AccountService;
using HealthcareSystem.Backend.Services.UserService;
using Microsoft.AspNetCore.Mvc;

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
                return BadRequest();
            }

            return Ok(userLogin);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO model)
        {
            var user = await _accountService.Register(model);
            if (user == null)
            {
                return BadRequest();
            }
            return Ok("Successfully");

        }
        [HttpPost("create-new-staff")]
        public async Task<IActionResult> CreateNewStaff([FromBody] UserDTO user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            var tempUser = await _userService.CreateUser(user);
            if (tempUser == null)
            {
                return BadRequest("Failed to create user.");
            }

            return Ok(tempUser);
        }
        [HttpPost("create-new-account")]
        public async Task<IActionResult> CreateAccount([FromBody] AccountBaseDTO account)
        {
            if (account == null)
            {
                return BadRequest();
            }

            var tempUser = await _accountService.CreateAccountStaff(account);
            if (tempUser == null)
            {
                return BadRequest("Failed to create user.");
            }

            return Ok(tempUser);
        }
    }
}
