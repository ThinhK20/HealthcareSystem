﻿using AutoMapper;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Services.UserService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

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

        [HttpGet("customerRequests")]
        public async Task<IActionResult> GetAllCustomerRequests()
        {
            try
            {
                return Ok(await _userService.GetAllCustomerRequestsAsync());
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpGet("customerRequests/{id:int}")]
        public async Task<IActionResult> GetCustomerRequestsById([FromRoute(Name = "id")] int requestId)
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
        [HttpPost("AcceptRequest/{id:int}")]
        public async Task<IActionResult> AcceptRequest([FromRoute(Name = "id")] int requestID)
        {
            try
            {
                return Ok(await _userService.AcceptCustomerRequest(requestID));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpPost("RefusedRequest/{id:int}")]
        public async Task<IActionResult> RefusedRequest([FromRoute(Name = "id")] int requestID)
        {
            try
            {
                return Ok(await _userService.RefusedCustomerRequest(requestID));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpPost("CompleteRequest/{id:int}")]
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
    }
}
