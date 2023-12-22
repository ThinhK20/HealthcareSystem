using HealthcareSystem.Backend.Models.DTO;
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
        [HttpPost("CreateNew")]
        public async Task<IActionResult> CreateNewPackage([FromBody] PackagePolicyCreateDTO detailCreate)
        {
            try
            {
                bool result = await _packagePoliceService.CreateNewPackage(detailCreate);
                if (result)
                {
                    return Ok(new
                    {
                        message = "Succes"
                    });
                }
                else
                {
                    return BadRequest(new
                    {
                        message = "fail"
                    });
                }
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
