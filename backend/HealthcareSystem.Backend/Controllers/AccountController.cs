using AutoMapper;
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


    }
}
