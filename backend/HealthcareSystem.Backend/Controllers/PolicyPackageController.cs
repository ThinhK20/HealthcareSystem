using HealthcareSystem.Backend.Services.PackagePoliceService;
using Microsoft.AspNetCore.Mvc;

namespace HealthcareSystem.Backend.Controllers
{
    [Route("api/policy-packages/")]
    [ApiController]
    public class PolicyPackageController : ControllerBase
    {
        private readonly IPackagePoliceService _packagePoliceService;

        public PolicyPackageController(IPackagePoliceService packagePoliceService)
        {
            _packagePoliceService = packagePoliceService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllPolicyPackages()
        {
            try
            {
                return Ok(await _packagePoliceService.GetAllPolicyPackagesAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetPolicyPackageById([FromRoute(Name = "id")] int packageId)
        {
            try
            {
                return Ok(await _packagePoliceService.GetPolicyPackageByIdAsync(packageId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
