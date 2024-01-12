using AutoMapper;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Services.AccountService;
using HealthcareSystem.Backend.Services.UserService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HealthcareSystem.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        public AuthController(IAccountService accountService, IMapper mapper, IUserService userService)
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

        [HttpPost("loginByGoogle")]
        public async Task<IActionResult> LoginByGoogle([FromBody] RegisterRequestDTO model)
        {
            var userLogin = await _accountService.LoginByGoogle(model);
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
        [HttpPost("generateToken")]
        public async Task<IActionResult> GenerateToken([FromBody] TokenRequest model)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("This is Secret Key of Project PTHTTTHD");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
               {
                    new Claim(ClaimTypes.Name, model.userId.ToString()),
                    new Claim(ClaimTypes.Role, model.role)
               }),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(token);
        }



    }
}
