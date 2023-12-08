﻿using AutoMapper;
using Azure;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Services.AccountService;
using HealthcareSystem.Backend.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace HealthcareSystem.Backend.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;

        public AccountController(IAccountService accountService, IMapper mapper)
        {
            _accountService = accountService;
            _mapper = mapper;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO model)
        {
            var userLogin = await _accountService.Login(model);
            if (userLogin.user == null)
            {
                return BadRequest();
            }

            return Ok(userLogin);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO model)
        {
            var user = await _accountService.Register(model);
            if (user == null)
            {
                return BadRequest();
            }
            return Ok("Successfully");

        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO model)
        {
            var user = await _accountService.Register(model);
            if (user == null)
            {
                return BadRequest();
            }
            return Ok("Successfully");

        }
        [HttpPost("verification")]
        public async Task<IActionResult> Verify([FromBody] AccountDTO model)
        {
            var user = await _accountService.Verification(model);
            if (user.UserId == null)
            {
                return BadRequest();
            }
            return Ok("Successfully");

        }
    }
}
