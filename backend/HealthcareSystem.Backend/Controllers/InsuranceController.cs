using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Repositories.InsuranceRepository;
using Microsoft.AspNetCore.Mvc;

namespace HealthcareSystem.Backend.Controllers
{
    [Route("api/insurances")]
    [ApiController]
    public class InsuranceController : ControllerBase
    {
        private readonly IInsuranceRepository _insuranceRepository;

        public InsuranceController(IInsuranceRepository insuranceRepository)
        {
            _insuranceRepository = insuranceRepository;
        }

        [HttpGet("all")]
        public async Task<ActionResult<List<InsuranceDomain>>> GetAllInsurances()
        {
            try
            {
                return Ok(await _insuranceRepository.GetAllInsurancesAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{insuranceId:int}")]
        public async Task<ActionResult<InsuranceDomain>> GetInsurance([FromRoute] int insuranceId)
        {
            try
            {
                return Ok(await _insuranceRepository.GetInsuranceByIdAsync(insuranceId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
