using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace HealthcareSystem.Backend.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomerRequest([FromBody] CustomerRequest customerRequest)
        {
            try
            {
                CustomerRequest createdRequest = await _userService.CreateCustomerRequestAsync(customerRequest);
                return Ok(createdRequest);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
