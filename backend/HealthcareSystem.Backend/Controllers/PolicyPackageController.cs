﻿using HealthcareSystem.Backend.Enums;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Services.PackagePoliceService;
using Microsoft.AspNetCore.Authorization;
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
                if (packageId <= 0) return BadRequest();
                return Ok(await _packagePoliceService.GetPolicyPackageByIdAsync(packageId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("detail-package")]
        public async Task<IActionResult> GetDetailPackage(int packageId,int policyId)
        {
            try
            {
                return Ok(await _packagePoliceService.GetPackageDetails(packageId, policyId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CreateNew")]
        [Authorize(Roles = Roles.AdminRole + "," + Roles.TestRole)]
        public async Task<IActionResult> CreateNewPackage([FromBody] PackagePolicyCreateDTO detailCreate)
        {
            try
            {
                if(detailCreate == null) return BadRequest();
                bool result = await _packagePoliceService.CreateNewPackage(detailCreate);
                if (result)
                {
                    return Ok(new
                    {
                        message = "Success"
                    });
                }
                else
                {
                    return BadRequest(new
                    {
                        message = "Fail"
                    });
                }
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("edit")]
        [Authorize(Roles = Roles.AdminRole + "," + Roles.TestRole)]
        public async Task<IActionResult> EditPackage([FromBody] PackagePolicyEditDTO packagePolicyEdit )
        {
            try
            {
                if (packagePolicyEdit == null) return BadRequest();
                bool result = await _packagePoliceService.EditPackage(packagePolicyEdit);
                if (result)
                {
                    return Ok(new
                    {
                        message = "Success"
                    });
                }
                else
                {
                    return BadRequest(new
                    {
                        message = "Fail"
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("inactive/{id:int}")]
        [Authorize(Roles = Roles.AdminRole + "," + Roles.TestRole)]

        public async Task<IActionResult> InActivePackage([FromRoute(Name = "id")] int packageId)
        {
            try
            {
                if (packageId <= 0 )    return BadRequest();
                bool result = await _packagePoliceService.InActivePackage(packageId);
                if (result)
                {
                    return Ok(new
                    {
                        message = "Success"
                    });
                }
                else
                {
                    return BadRequest(new
                    {
                        message = "Fail"
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("active/{id:int}")]
        [Authorize(Roles = Roles.AdminRole + "," + Roles.TestRole)]

        public async Task<IActionResult> ActivePackage([FromRoute(Name = "id")] int packageId)
        {
            try
            {
                if (packageId <= 0) return BadRequest();    
                bool result = await _packagePoliceService.ActivePackage(packageId);
                if (result)
                {
                    return Ok(new
                    {
                        message = "Success"
                    });
                }
                else
                {
                    return BadRequest(new
                    {
                        message = "Fail"
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
