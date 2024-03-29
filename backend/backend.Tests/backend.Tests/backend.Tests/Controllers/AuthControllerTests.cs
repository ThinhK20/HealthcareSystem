﻿using AutoMapper;
using FakeItEasy;
using FluentAssertions;
using HealthcareSystem.Backend.Controllers;
using HealthcareSystem.Backend.Enums;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Services.AccountService;
using HealthcareSystem.Backend.Services.UserService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Tests.Controllers;

public class AuthControllerTests
{
    private readonly IAccountService _accountService;
    private readonly IMapper _mapper;
    private readonly IUserService _userService;

    public AuthControllerTests()
    {
        _accountService = A.Fake<IAccountService>();
        _mapper = A.Fake<IMapper>();
        _userService = A.Fake<IUserService>();
    }

    private AuthController GetController()
    {
        return new AuthController(_accountService, _mapper, _userService);
    }

    [Fact]
    public async Task Login()
    {
        LoginRequestDTO model = A.Fake<LoginRequestDTO>();
        LoginResponseDTO userLogin = A.Fake<LoginResponseDTO>();

        A.CallTo(() => _accountService.Login(model)).Returns(userLogin);

        // Act
        var controller = GetController();
        var result = await controller.Login(model);

        // Assert
        userLogin.Should().NotBeNull();
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }

    [Fact]
    public async Task LoginByGoogle()
    {
        RegisterRequestDTO model = A.Fake<RegisterRequestDTO>();
        LoginResponseDTO userLogin = A.Fake<LoginResponseDTO>();
        A.CallTo(() => _accountService.loginByGoogle("fake mail")).Returns(Task.FromResult(userLogin));
        
        // Act
        var controller = GetController();
        var result = await controller.loginByGoogle(model);
        
        // Assert
        userLogin.Should().NotBeNull();
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }

    [Fact]
    public async Task Register()
    {
        RegisterRequestDTO model = A.Fake<RegisterRequestDTO>();
        AccountDTO user = A.Fake<AccountDTO>();
        A.CallTo(() => _accountService.Register(model)).Returns(Task.FromResult(user));

        // Act
        var controller = GetController();
        var result = await controller.Register(model);

        // Assert
        user.Should().NotBeNull();
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }

    [Fact]
    public async Task Verify()
    {
        int model = 0;
        A.CallTo(() => _accountService.Verification(model)).Returns(true);

        // Act
        var controller = GetController();
        var result = await controller.Verify(model);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }

    [Fact]
    public async Task GenerateToken()
    {
        TokenRequest model = A.Fake<TokenRequest>();
        model.role = Roles.UserRole; // Cannot fake a role attribute, so I added a default value
        var tokenHandler = A.Fake<JwtSecurityTokenHandler>();
        var key = Encoding.UTF8.GetBytes("This is Secret Key of Project PTHTTTHD");
        var token = A.Fake<SecurityToken>();


        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, model.userId.ToString()),
                new Claim(ClaimTypes.Role, model.role),
              }),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        token = tokenHandler.CreateToken(tokenDescriptor);

        token.Should().NotBeNull();
    }
    [Fact]
    public async Task AuthController_LoginByGoogle_ReturnBadRequest_WhenServiceFails()
    {
        LoginResponseDTO fake = null;
        // Arrange
        A.CallTo(() => _accountService.loginByGoogle(A<string>._)).Returns(Task.FromResult(fake));
        var controller = GetController();

        // Act
        var result = await controller.loginByGoogle(new RegisterRequestDTO { Email = "test@example.com" });

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType<BadRequestObjectResult>();
    }
    [Fact]
    public async Task AuthController_Verify_ReturnBadRequest_WhenServiceFails()
    {
        // Arrange
        A.CallTo(() => _accountService.Verification(A<int>._)).Returns(Task.FromResult(false));
        var controller = GetController();

        // Act
        var result = await controller.Verify(new int());

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType<BadRequestResult>();
    }
    [Fact]
    public async Task AuthController_CheckEmailByGoogle_ReturnBadRequest_WhenServiceFails()
    {
        UserGoogleDTO fake = null;
        // Arrange
        A.CallTo(() => _userService.checkEmailByGoogleLogin(A<UserDTO>._)).Returns(Task.FromResult(fake));
        var controller = GetController();

        // Act
        var result = await controller.checkEmailByGoogle(new UserDTO { /* Set valid properties */ });

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType<BadRequestObjectResult>();
    }


}