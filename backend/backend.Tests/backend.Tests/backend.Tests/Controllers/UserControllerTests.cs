//using AutoMapper;
//using FakeItEasy;
//using FluentAssertions;
//using HealthcareSystem.Backend.Controllers;
//using HealthcareSystem.Backend.Models.DTO;
//using HealthcareSystem.Backend.Services.AccountService;
//using HealthcareSystem.Backend.Services.UserService;
//using Microsoft.AspNetCore.Mvc;

//namespace backend.Tests.Controllers;

//public class UserControllerTests
//{
//    private readonly IUserService _userService;
//    private readonly IMapper _mapper;
//    public UserControllerTests()
//    {
//        _userService = A.Fake<IUserService>();
//        _mapper = A.Fake<IMapper>();

//    }

//    private UsersController GetController()
//    {
//        return new UsersController( _mapper, _userService);
//    }

//    [Fact]
//    public async Task UserController_CreateCustomerRequest_ValidInput_ReturnsOk()
//    {
//        // Arrange
//        var userService = A.Fake<IUserService>();
//        var mapper = A.Fake<IMapper>();
//        var controller = new UserController(userService, mapper);


//        CustomerRequestCreateDTO customerRequestCreate = new CustomerRequestCreateDTO
//        {
//            AccountId = customerRequestCreate.AccountId,
//            PackageId = customerRequestCreate.PackageId,
//            DateRequest = customerRequestCreate.DateRequest,
//            Periodic = customerRequestCreate.Periodic

//        };

//        A.CallTo(() => userService.CreateCustomerRequestAsync(customerRequestCreate)).Returns(Task.FromResult("Some Result"));

//        // Act
//        var result = await controller.CreateCustomerRequest(customerRequest) as OkObjectResult;

//        // Assert
//        Assert.NotNull(result);
//        Assert.Equal(200, result.StatusCode);
//        result.Should().NotBeNull();
//        result.Should().BeOfType(typeof(OkObjectResult));
//    }

//     [Fact]
//    public async Task UserController_GetAllCustomerRequests_ValidInput_ReturnsOk()
//    {
//        // Arrange
//        var userService = A.Fake<IUserService>();
//        var mapper = A.Fake<IMapper>();
//        var controller = new UserController(userService, mapper);

//        List<CustomerRequestDomain> customerRequests = A.Fake<List<CustomerRequestDomain>>();

//        A.CallTo(() => userService.GetAllCustomerRequestsAsync()).Returns(Task.FromResult(customerRequests));

//        // Act
//        var result = await controller.GetAllCustomerRequests() as ObjectResult;

//        // Assert
//        Assert.NotNull(result);
//        Assert.Equal(200, result.StatusCode);
//        result.Should().NotBeNull();
//        result.Should().BeOfType(typeof(OkObjectResult));

//    }

//    public async Task UserController_GetCustomerRequestsById_ValidInput_ReturnsOk()
//    {
//        // Arrange
//        var userService = A.Fake<IUserService>();
//        var mapper = A.Fake<IMapper>();
//        var controller = new UserController(userService, mapper);

//        const int requestId = 1;

//        A.CallTo(() => userService.GetCustomerRequestByIdAsync(requestId)).Returns(Task.FromResult(true));

//        // Act
//        var result = await controller.GetCustomerRequestsById(requestId) as ObjectResult;

//        // Assert
//        Assert.NotNull(result);
//        Assert.Equal(200, result.StatusCode);
//        result.Should().NotBeNull();
//        result.Should().BeOfType(typeof(OkObjectResult));
//    }

//    [Fact]
//    public async Task UserController_DeleteCustomerRequestById_ReturnOk()
//    {
//        int requestId = 1;
//        A.CallTo(() => _accountService.DeleteAccount(requestId)).Returns(true);

//        // Act
//        var controller = GetController();
//        var result = await controller.DeleteCustomerRequestById(requestId);

//        // Assert
//        result.Should().NotBeNull();
//        result.Should().BeOfType(typeof(OkObjectResult));
//    }

//    [Fact]
//    public async Task UserController_AcceptRequest_ValidInput_ReturnsOk()
//    {
//        // Arrange
//        var userService = A.Fake<IUserService>();
//        var mapper = A.Fake<IMapper>();
//        var controller = new UserController(userService, mapper);

//        const int requestID = 1;
//        const int staffId = 2;

//        A.CallTo(() => userService.AcceptCustomerRequest(requestID, staffId)).Returns(Task.FromResult("SomeResult"));

//        // Act
//        var result = await controller.AcceptRequest(requestID, staffId) as ObjectResult;

//        // Assert
//        Assert.NotNull(result);
//        Assert.Equal(200, result.StatusCode);
//        result.Should().NotBeNull();
//        result.Should().BeOfType(typeof(OkObjectResult));

//    }

//    [Fact]
//    public async Task UserController_RefusedRequest_ValidInput_ReturnsOk()
//    {
//        // Arrange
//        var userService = A.Fake<IUserService>();
//        var mapper = A.Fake<IMapper>();
//        var controller = new UserController(userService, mapper);

//        const int requestID = 1;

//        A.CallTo(() => userService.RefusedCustomerRequest(requestID)).Returns(Task.FromResult(requestID));

//        // Act
//        var result = await controller.RefusedRequest(requestID) as ObjectResult;

//        // Assert
//        Assert.NotNull(result);
//        Assert.Equal(200, result.StatusCode);
//        result.Should().NotBeNull();
//        result.Should().BeOfType(typeof(OkObjectResult));
//    }

//    [Fact]
//    public async Task UserController_Test_ValidInput_ReturnsOk()
//    {
//        // Arrange
//        var userService = A.Fake<IUserService>();
//        var mapper = A.Fake<IMapper>();
//        var controller = new UserController(userService, mapper);

//        const int requestID = 1;

//        A.CallTo(() => userService.CompleteCustomerRequest(requestID)).Returns(Task.FromResult(requestID));

//        // Act
//        var result = await controller.Test(requestID) as ObjectResult;

//        // Assert
//        Assert.NotNull(result);
//        Assert.Equal(200, result.StatusCode);
//        result.Should().NotBeNull();
//        result.Should().BeOfType(typeof(OkObjectResult));
//    }

//}