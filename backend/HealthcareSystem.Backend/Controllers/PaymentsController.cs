using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories;
using HealthcareSystem.Backend.Repositories.InsuranceDetailRepository;
using Microsoft.AspNetCore.Mvc;


namespace HealthcareSystem.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly IInsuranceDetailRepository _insuranceDetailRepository;
        public PaymentsController(IPaymentRepository paymentRepository, IInsuranceDetailRepository insuranceDetailRepository)
        {
            _paymentRepository = paymentRepository;
            _insuranceDetailRepository = insuranceDetailRepository;
        }

        [HttpPost("CreatePayment")]
        public async Task<IActionResult> CreatePayment([FromBody] PaymentCreateDTO payment)
        {
            try
            {
                var result = await _paymentRepository.CreatePayment(payment);
                if (result != null)
                {
                    return Ok("Payment created successfully.");
                }
                else
                {
                    return BadRequest("Failed to create payment.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("UpdateStatus/{paymentId}")]
        public async Task<IActionResult> UpdateStatus(int paymentId)
        {
            try
            {
                var result = await _paymentRepository.UpdateStatus(paymentId);
                if (result)
                {
                    return Ok("Payment status updated successfully.");
                }
                else
                {
                    return BadRequest("Failed to update payment status.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeletePayment/{paymentId}")]
        public async Task<IActionResult> DeletePayment(int paymentId)
        {
            try
            {
                var result = await _paymentRepository.DeletePaymentByIdAsync(paymentId);
                if (result)
                {
                    return Ok("Payment deleted successfully.");
                }
                else
                {
                    return BadRequest("Failed to delete payment.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllPaymentRequests")]
        public async Task<IActionResult> GetAllPaymentRequests()
        {
            try
            {
                var payments = await _paymentRepository.GetAllPaymentRequestsAsync();
                return Ok(payments);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetPendingTransferPaymentRequests")]
        public async Task<IActionResult> GetPendingTransferPaymentRequests()
        {
            try
            {
                var payments = await _paymentRepository.GetPendingTransferPaymentRequestsAsync();
                return Ok(payments);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
        [HttpGet("GetPaymentId/{paymentId}")]
        public async Task<IActionResult> GetPaymentId(int paymentId)
        {
            try
            {
                var payment = await _paymentRepository.GetPaymentIdAsync(paymentId);
                if (payment != null)
                {
                    return Ok(payment);
                }
                else
                {
                    return NotFound($"Payment with ID {paymentId} not found.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetPaymentDetailId/{InsureID}")]
        public async Task<IActionResult> GetInranceDetail(int InsureID)
        {
            try
            {
                var payment = await _insuranceDetailRepository.GetByIdAsync(InsureID);
                if (payment != null)
                {
                    return Ok(payment);
                }
                else
                {
                    return NotFound($"Payment with ID {InsureID} not found.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
