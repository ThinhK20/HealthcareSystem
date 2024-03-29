﻿using HealthcareSystem.Backend.Enums;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories.InsuranceRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthcareSystem.Backend.Controllers
{
    [Route("api/insurances")]
    [ApiController]
    [Authorize]
    public class InsuranceController : ControllerBase
    {
        private readonly IInsuranceRepository _insuranceRepository;

        public InsuranceController(IInsuranceRepository insuranceRepository)
        {
            _insuranceRepository = insuranceRepository;
        }

        [HttpGet("all")]
        [Authorize(Roles = Roles.AdminRole + "," + Roles.TestRole)]

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

        [HttpGet("insurancesOnPage")]
        public async Task<ActionResult<List<InsuranceDomain>>> GetInsurancesOnPage(int pageSize = 2, int pageNumber = 1)
        {
            try
            {
                Pagination page = new Pagination
                {
                    PageNumber = pageNumber,
                    PageSize = pageSize
                };
                return Ok(await _insuranceRepository.GetInsurancesOnPage(page));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{insuranceId:int}")]
        [Authorize(Roles = Roles.AdminRole + "," + Roles.TestRole)]

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

        [HttpDelete("{insuranceId:int}")]
        [Authorize(Roles = Roles.AdminRole + "," + Roles.TestRole)]

        public async Task<ActionResult<InsuranceDomain>> Delete([FromRoute] int insuranceId)
        {
            try
            {
                if (insuranceId <= 0) return BadRequest();
                return Ok(await _insuranceRepository.Delete(insuranceId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = Roles.AdminRole + "," + Roles.TestRole)]

        public async Task<ActionResult<InsuranceDomain>> Create([FromBody] InsuranceDTO data)
        {
            try
            {
                if(data == null) { throw new Exception("error"); }
                return Ok(await _insuranceRepository.CreateInsurance(data));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut]
        [Authorize(Roles = Roles.AdminRole + "," + Roles.TestRole)]

        public async Task<ActionResult<InsuranceDomain>> Update([FromBody] InsuranceUpdateDTO data)
        {
            try
            {
                if (data == null) throw new Exception("error");
                return Ok(await _insuranceRepository.UpdateInsurance(data));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
