using HealthcareSystem.Backend.Enums;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Services.RefundDetailService;
using Microsoft.AspNetCore.Mvc;

namespace HealthcareSystem.Backend.Controllers
{
    [Route("api/refund-detail/")]
    [ApiController]
    public class RefundDetailController : ControllerBase
    {
        private readonly IRefundDetailService _refundDetailService;

        public RefundDetailController(IRefundDetailService refundDetailService)
        {
            _refundDetailService = refundDetailService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateRefundDetail(CreateRefundDetailDTO refundDetailDTO)
        {
            try
            {
                var result = await _refundDetailService.CreateRefundDetailAsync(refundDetailDTO);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllRefundDetails()
        {
            return Ok(await _refundDetailService.GetAllRefundDetailsAsync());
        }

        [HttpGet("get/{id:int}")]
        public async Task<IActionResult> GetRefundDetail([FromRoute(Name = "id")] int refundDetailId)
        {
            return Ok(await _refundDetailService.GetRefundDetailAsync(refundDetailId));
        }
    }
}