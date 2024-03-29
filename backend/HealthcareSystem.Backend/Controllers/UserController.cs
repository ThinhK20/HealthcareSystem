﻿using AutoMapper;
using HealthcareSystem.Backend.Enums;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace HealthcareSystem.Backend.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }
        [HttpPost("customerRequests/create")]
        [Authorize(Roles = Roles.UserRole + "," + Roles.TestRole)]
        public async Task<IActionResult> CreateCustomerRequest([FromBody] CustomerRequestCreateDTO customerRequest)
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
        [HttpGet("customerRequests/price")]
        [Authorize(Roles = Roles.UserRole + "," + Roles.TestRole)]
        public async Task<IActionResult> GetPriceForUser([FromQuery] int accountId,[FromQuery]int packageId, [FromQuery] string periodic)
        {
            try
            {
                return Ok(await _userService.GetPriceForUser(accountId, packageId, periodic));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("customerRequests")]
        [Authorize(Roles = Roles.CustomerCareRole + "," + Roles.TestRole + "," + Roles.AccountantRole + "," + Roles.NormalStaffRole + "," + Roles.AdminRole)]
        public async Task<IActionResult> GetAllCustomerRequests()
        {
            try
            {
                var result = await _userService.GetAllCustomerRequestsAsync();
                return Ok(result.OrderByDescending(x => x.RequestID));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("customerRequestsByAccId/{id:int}")]
        //[Authorize(Roles = Roles.CustomerCareRole + "," + Roles.AccountantRole + "," + Roles.NormalStaffRole + "," + Roles.AdminRole + "," + Roles.UserRole + "," + Roles.TestRole)]
        public async Task<IActionResult> GetAllCustomerRequestsByAccId([FromRoute(Name = "id")] int accountId)
        {
            try
            {
                var result = await _userService.GetAllCustomerRequestsAsync();
                return Ok(result.Where(x => x.AccountId == accountId));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("customerRequests/{id:int}")]
        [Authorize(Roles = Roles.TestRole + "," + Roles.AdminRole + "," + Roles.NormalStaffRole + "," + Roles.UserRole)]
        public async Task<IActionResult> GetCustomerRequestById([FromRoute(Name = "id")] int requestId)
        {
            try
            {
                return Ok(await _userService.GetCustomerRequestByIdAsync(requestId));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpPost("AcceptRequest")]
        [Authorize(Roles = Roles.AdminRole + "," + Roles.NormalStaffRole + "," + Roles.TestRole)]
        public async Task<IActionResult> AcceptRequest(int requestID, int staffid)
        {
            try
            {
                return Ok(await _userService.AcceptCustomerRequest(requestID, staffid));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpPost("RefusedRequest")]
        [Authorize(Roles = Roles.AdminRole + "," + Roles.NormalStaffRole + "," + Roles.TestRole)]
        public async Task<IActionResult> RefusedRequest([FromQuery] int requestID, [FromQuery] int staffid)
        {
            try
            {
                return Ok(await _userService.RefusedCustomerRequest(requestID, staffid));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpPost("CompleteRequest/{id:int}")]
        [Authorize(Roles = Roles.AdminRole + "," + Roles.NormalStaffRole + "," + Roles.TestRole)]
        public async Task<IActionResult> Test([FromRoute(Name = "id")] int requestID)
        {
            try
            {
                return Ok(await _userService.CompleteCustomerRequest(requestID));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpDelete("customerRequests/{id:int}")]
        [Authorize(Roles = Roles.AdminRole + "," + Roles.NormalStaffRole + "," + Roles.TestRole)]
        public async Task<IActionResult> DeleteCustomerRequestById([FromRoute(Name = "id")] int requestId)
        {
            try
            {
                return Ok(await _userService.DeleteCustomerRequestByIdAsync(requestId));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpGet("getAll")]
        [Authorize(Roles = Roles.AdminRole + "," + Roles.NormalStaffRole + "," + Roles.TestRole)]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var result = await _userService.GetAllUsers();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getUserByEmail")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            try
            {
                var result = await _userService.GetUserByEmail(email);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("HealthRecords")]
        public async Task<IActionResult> GetHealthRecords([FromQuery] int userId)
        {
            try
            {
                var result = await _userService.GetHealthRecords(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("addnewHR")]
        public async Task<IActionResult> GetHealthRecords([FromBody] List<HealthRecordDTO> data)
        {
            try
            {
                var result = await _userService.addnewHr(data);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getAllFeeAffect")]
        public async Task<IActionResult> getAllFeeAffect()
        {
            try
            {
                var result = await _userService.getAllFeeAffect();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
