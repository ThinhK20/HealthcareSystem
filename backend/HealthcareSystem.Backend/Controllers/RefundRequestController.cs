using HealthcareSystem.Backend.Models.Domain;
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

        [HttpGet("all")]
        public async Task<ActionResult<List<RefundRequestDomain>>> GetAllRefundRequests()
        {
            try
            {
                var result = await _refundRequestService.GetAllRefundRequestsAsync();
                return Ok(result.OrderByDescending(rr => rr.DateSend));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<RefundRequestDomain>> GetRefundRequest([FromRoute(Name = "id")] int refundId)
        {
            try
            {
                return Ok(await _refundRequestService.GetRefundRequestByIdAsync(refundId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public async Task<ActionResult<RefundRequestDomain>> GetRefundRequestByAccountId([FromQuery(Name = "accountId")] int accountId)
        {
            try
            {
                var result = await _refundRequestService.GetRefundRequestByAccountIdAsync(accountId);
                return Ok(result.OrderByDescending(rr => rr.DateSend));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("accept/{id:int}")]
        public async Task<ActionResult<RefundRequestDomain>> AcceptRefundRequest([FromRoute(Name = "id")] int refundId)
        {
            try
            {
                return Ok(await _refundRequestService.AcceptRefundRequestByIdAsync(refundId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("reject/{id:int}")]
        public async Task<ActionResult<RefundRequestDomain>> RejectRefundRequest([FromRoute(Name = "id")] int refundId)
        {
            try
            {
                return Ok(await _refundRequestService.RejectRefundRequestByIdAsync(refundId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("/pending/{id:int}")]
        public async Task<ActionResult<RefundRequestDomain>> PendingRefundRequest([FromRoute(Name = "id")] int refundId)
        {
            try
            {
                return Ok(await _refundRequestService.PendingRefundRequestByIdAsync(refundId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateRefundRequest([FromForm] RefundRequestDTO refundRequestDTO)
        {
            try
            {
                return Ok(await _refundRequestService.UpdateRefundRequestAsync(refundRequestDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
