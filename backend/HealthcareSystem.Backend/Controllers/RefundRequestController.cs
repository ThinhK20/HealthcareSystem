using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Services.RefundRequestService;
using Microsoft.AspNetCore.Mvc;

namespace HealthcareSystem.Backend.Controllers
{
    [Route("api/refund-requests")]
    [ApiController]
    public class RefundRequestController : ControllerBase
    {
        private readonly IRefundRequestService _refundRequestService;

        public RefundRequestController(IRefundRequestService refundRequestService)
        {
            _refundRequestService = refundRequestService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> CreateNewRefundRequest([FromForm] RefundRequestDTO refundRequestDTO)
        {
            try
            {
                return Ok(await _refundRequestService.CreateRefundRequestAsync(refundRequestDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
