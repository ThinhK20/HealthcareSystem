using AutoMapper;
using Azure;
using FakeItEasy;
using FluentAssertions;
using HealthcareSystem.Backend.Controllers;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Services.UserService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.VisualStudio.TestPlatform.ObjectModel.DataCollection;
using Xunit;

namespace backend.Tests.Controllers;

public class UserControllerTests
{
    private readonly IUserService _userService;
    private readonly IMapper _mapper;
    public UserControllerTests()
    {
        _userService = A.Fake<IUserService>();
        _mapper = A.Fake<IMapper>();

    }

    private UserController GetController()
    {
        return new UserController(_userService, _mapper);
    }

    [Fact]
    public async Task UserController_CreateCustomerRequest_ValidInput_ReturnsOk()
    {
        //Arrange
        CustomerRequestDTO customerRequest = A.Fake<CustomerRequestDTO>();
        UserDTO userCreate = A.Fake<UserDTO>();
        UserDTO tempUser = A.Fake<UserDTO>();
        CustomerRequestCreateDTO tempCustomerRequestCreate = A.Fake<CustomerRequestCreateDTO>();

        A.CallTo(() => _mapper.Map<UserDTO>(customerRequest)).Returns(userCreate);
        A.CallTo(() => _userService.CreateUser(userCreate)).Returns(Task.FromResult(tempUser));

        CustomerRequestCreateDTO customerRequestCreate = new CustomerRequestCreateDTO
        {
            AccountId = customerRequest.AccountId,
            PackageId = customerRequest.PackageId,
            DateRequest = customerRequest.DateRequest,
            Periodic = customerRequest.Periodic
        };

        A.CallTo(() => _userService.CreateCustomerRequestAsync(customerRequestCreate)).Returns(Task.FromResult(tempCustomerRequestCreate));


        // Act
        var controller = GetController();
        var result = await controller.CreateCustomerRequest(customerRequestCreate);

        // Assert
        userCreate.Should().NotBeNull();
        customerRequestCreate.Should().NotBeNull();
        tempUser.Should().NotBeNull();
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));


    }

    [Fact]
    public async Task UserController_GetAllCustomerRequests_ValidInput_ReturnsOk()
    {
        // Arrange

        List<CustomerRequestDomain> customerRequests = A.Fake<List<CustomerRequestDomain>>();

        A.CallTo(() => _userService.GetAllCustomerRequestsAsync()).Returns(Task.FromResult(customerRequests));

        // Act
        var controller = GetController();
        var result = await controller.GetAllCustomerRequests();

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));

    }

    [Fact]
    public async Task UserController_GetCustomerRequestsById_ReturnOk()
    {
        //Arrange
        CustomerRequestDomain customerRequests = A.Fake<CustomerRequestDomain>();

        int requestID = 1;

        A.CallTo(() => _userService.GetCustomerRequestByIdAsync(requestID)).Returns(Task.FromResult(customerRequests));

        // Act
        var controller = GetController();
        var result = await controller.GetCustomerRequestById(requestID);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }

    [Fact]
    public async Task UserController_AcceptRequest_ValidInput_ReturnsOk()
    {
        // Arrange
        const int requestID = 1;
        const int staffId = 2;

        A.CallTo(() => _userService.AcceptCustomerRequest(requestID, staffId)).Returns(Task.FromResult(true));

        // Act
        var controller = GetController();
        var result = await controller.AcceptRequest(requestID, staffId);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));

    }

    [Fact]
    public async Task UserController_RefusedRequest_ValidInput_ReturnsOk()
    {
        // Arrange
        var customerRequests = A.Fake<List<CustomerRequestDomain>>();

        const int requestID = 1;

        A.CallTo(() => _userService.RefusedCustomerRequest(requestID)).Returns(Task.FromResult(true));

        //Act
        var controller = GetController();
        var result = await controller.RefusedRequest(requestID);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));


    }

    [Fact]
    public async Task UserController_Test_ValidInput_ReturnsOk()
    {
        // Arrange
        const int requestID = 1;

        A.CallTo(() => _userService.CompleteCustomerRequest(requestID)).Returns(Task.FromResult(true));

        // Act
        var controller = GetController();
        var result = await controller.Test(requestID);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }

    [Fact]
    public async Task UserController_DeleteCustomerRequestById_ReturnOk()
    {
        int requestId = 1;
        A.CallTo(() => _userService.DeleteCustomerRequestByIdAsync(requestId)).Returns(true);

        // Act
        var controller = GetController();
        var result = await controller.DeleteCustomerRequestById(requestId);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }

    [Fact]
    public async Task UserController_GetAllUsers_ReturnOK()
    {
        // Arrange
        var allUsers = A.Fake<List<UserDTO>>();
        A.CallTo(() => _userService.GetAllUsers()).Returns(Task.FromResult(allUsers));
        var controller = GetController();

        // Act
        var result = await controller.GetAllUsers();

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }

    // Bad Request And Not Found

    [Fact]
    public async Task UserController_CreateCustomerRequest_NullRequest_ReturnsBadRequest()
    {
        //Arrange
        CustomerRequestDTO customerRequest = A.Fake<CustomerRequestDTO>();
        UserDTO userCreate = A.Fake<UserDTO>();
        UserDTO tempUser = A.Fake<UserDTO>();
        CustomerRequestCreateDTO tempCustomerRequestCreate = A.Fake<CustomerRequestCreateDTO>();

        A.CallTo(() => _mapper.Map<UserDTO>(customerRequest)).Returns(userCreate);
        A.CallTo(() => _userService.CreateUser(userCreate)).Returns(Task.FromResult(tempUser));

        CustomerRequestCreateDTO customerRequestCreate = new CustomerRequestCreateDTO
        {
            AccountId = customerRequest.AccountId,
            PackageId = customerRequest.PackageId,
            DateRequest = customerRequest.DateRequest,
            Periodic = customerRequest.Periodic
        };

        A.CallTo(() => _userService.CreateCustomerRequestAsync(null))
            .ThrowsAsync(new Exception("request can not be null"));

        var controller = GetController();

        // Act
        var result = await controller.CreateCustomerRequest(null);

        // Assert
        result.Should().BeAssignableTo<BadRequestObjectResult>()
            .Which.Value.Should().BeAssignableTo<string>()
            .Which.Should().Be("request can not be null");



    }

    [Fact]
    public async Task GetAllCustomerRequests_ExceptionThrown_ReturnsNotFound()
    {
        // Arrange
        //var userServiceFake = A.Fake<IUserService>();
        A.CallTo(() => _userService.GetAllCustomerRequestsAsync())
            .ThrowsAsync(new Exception("Some error message"));

        var controller = new UserController(_userService, A.Fake<IMapper>());

        // Act
        var result = await controller.GetAllCustomerRequests();

        // Assert
        result.Should().BeAssignableTo<NotFoundObjectResult>()
            .Which.Value.Should().BeAssignableTo<string>()
            .Which.Should().Be("Some error message");
    }


    [Fact]
    public async Task GetAllUsers_ExceptionThrown_ReturnsBadRequest()
    {
        // Arrange
        var userServiceFake = A.Fake<IUserService>();
        A.CallTo(() => userServiceFake.GetAllUsers())
            .ThrowsAsync(new Exception("Some error message"));

        var controller = new UserController(userServiceFake, A.Fake<IMapper>());

        // Act
        var result = await controller.GetAllUsers();

        // Assert
        result.Should().BeAssignableTo<BadRequestObjectResult>()
            .Which.Value.Should().BeAssignableTo<string>()
            .Which.Should().Be("Some error message");
    }

    [Fact]
    public async Task GetCustomerRequestById_InvalidId_ReturnsNotFoundResult()
    {
        // Arrange
        int requestID = 1;
        //CustomerRequestDomain customerRequests = null;

        A.CallTo(() => _userService.GetCustomerRequestByIdAsync(requestID)).ThrowsAsync(new Exception("Some error message"));

        // Act
        var controller = GetController();
        var result = await controller.GetCustomerRequestById(requestID);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType<NotFoundObjectResult>();
    }

    [Fact]
    public async Task DeleteCustomerRequestById_InvalidId_ReturnsNotFoundResult()
    {
        // Arrange

        int requestID = 1;



        A.CallTo(() => _userService.DeleteCustomerRequestByIdAsync(requestID)).ThrowsAsync(new Exception("Some error message"));

        // Act
        var controller = GetController();
        var result = await controller.DeleteCustomerRequestById(requestID);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType<NotFoundObjectResult>();
    }

    [Fact]
    public async Task UserController_RefusedRequest_ReturnsNotFound()
    {

        // Arrange

        int requestID = 1;



        A.CallTo(() => _userService.RefusedCustomerRequest(requestID)).ThrowsAsync(new Exception("Some error message"));

        // Act
        var controller = GetController();
        var result = await controller.RefusedRequest(requestID);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType<NotFoundObjectResult>();


    }

    [Fact]
    public async Task AcceptRequest_InvalidInput_ReturnsNotFound()
    {
        // Arrange
        const int requestID = 1;
        const int staffId = 2;

        A.CallTo(() => _userService.AcceptCustomerRequest(requestID, staffId)).ThrowsAsync(new Exception("Some error message"));

        // Act
        var controller = GetController();
        var result = await controller.AcceptRequest(requestID, staffId);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType<NotFoundObjectResult>();
    }

    [Fact]
    public async Task UserController_Test_RequestIdIsNull_ReturnsNotFound()
    {
        // Arrange
        const int requestID = 1;

        A.CallTo(() => _userService.CompleteCustomerRequest(requestID)).ThrowsAsync(new Exception("Some error message"));

        // Act
        var controller = GetController();
        var result = await controller.Test(requestID);

        // Assert
        //result.Should().NotBeNull();
        result.Should().NotBeNull();
        result.Should().BeOfType<NotFoundObjectResult>();
    }


}