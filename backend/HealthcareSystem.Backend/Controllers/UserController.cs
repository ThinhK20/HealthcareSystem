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

        [HttpPost("createCustomerRequest")]
        public async Task<IActionResult> CreateCustomerRequest([FromBody] CustomerRequest customerRequest)
        {
            try
            {
                return Ok(await _userService.CreateCustomerRequestAsync(customerRequest));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("customerRequests")]
        public async Task<IActionResult> GetAllCustomerRequests()
        {
            try
            {
                return Ok(await _userService.GetAllCustomerRequestsAsync());
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("customerRequests/{id:int}")]
        public async Task<IActionResult> GetCustomerRequestsById([FromRoute(Name = "id")] int requestId)
        {
            try
            {
                return Ok(_userService.GetCustomerRequestByIdAsync(requestId));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("customerRequests/{id:int}")]
        public async Task<IActionResult> DeleteCustomerRequestById([FromRoute(Name = "id")] int requestId)
        {
            try
            {
                return Ok(_userService.DeleteCustomerRequestByIdAsync(requestId));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
