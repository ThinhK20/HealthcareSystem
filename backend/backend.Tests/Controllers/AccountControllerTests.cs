using AutoMapper;
using FakeItEasy;
using FluentAssertions;
using HealthcareSystem.Backend.Controllers;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Services.AccountService;
using HealthcareSystem.Backend.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Tests.Controllers;

public class AccountControllerTests
{
    private readonly IAccountService _accountService;
    private readonly IUserService _userService;
    private readonly IMapper _mapper;
    public AccountControllerTests()
    {
        _userService = A.Fake<IUserService>();
        _mapper = A.Fake<IMapper>();
        _accountService = A.Fake<IAccountService>();
    }

    private AccountsController GetController()
    {
        return new AccountsController(_accountService, _mapper, _userService);
    }

    [Fact]
    public async Task AccountController_GetAllAccount_ReturnOK()
    {
        // Arrange
        var allAccounts = A.Fake<List<AccountGetDTO>>();
        A.CallTo(() => _accountService.GetAllAccount()).Returns(Task.FromResult(allAccounts));
        var controller = GetController();

        // Act
        var result = await controller.getAccount();

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }

    [Fact]
    public async Task AccountController_CreateAccountStaff_ReturnOk()
    {
        // Arrange
        AccountUserDTO account = A.Fake<AccountUserDTO>();
        UserDTO userCreate = A.Fake<UserDTO>();
        UserDTO tempUser = A.Fake<UserDTO>();
        AccountBaseDTO tempAccount = A.Fake<AccountBaseDTO>();

        string email = "";

        A.CallTo(() => _mapper.Map<UserDTO>(account)).Returns(userCreate);
        A.CallTo(() => _userService.CreateUser(userCreate)).Returns(Task.FromResult(tempUser));

        AccountBaseDTO accCreate = new AccountBaseDTO
        {
            UserId = tempUser.UserId,
            Username = account.Username,
            Password = account.Password,
            Status = account.Status,
            Role = account.Role
        };

        A.CallTo(() => _accountService.CreateAccountStaff(accCreate, email)).Returns(Task.FromResult(tempAccount));

        // Act
        var controller = GetController();
        var result = await controller.CreateAccountStaff(account);

        // Assert
        userCreate.Should().NotBeNull();
        accCreate.Should().NotBeNull();
        tempUser.Should().NotBeNull();
        result.Should().NotBeNull();
    }

    [Fact]
    public async Task AccountController_EditUser_ReturnOk()
    {
        AccountBaseDTO account = A.Fake<AccountBaseDTO>();
        AccountBaseDTO accCreate = A.Fake<AccountBaseDTO>();

        accCreate = new AccountBaseDTO
        {
            AccountId = account.AccountId,
            UserId = account.UserId,
            Username = account.Username,
            Password = account.Password,
            Status = account.Status,
            Role = account.Role
        };

        AccountBaseDTO tempAccount = A.Fake<AccountBaseDTO>();
        A.CallTo(() => _accountService.UpdateAccountStaff(accCreate)).Returns(Task.FromResult(tempAccount));

        // Act
        var controller = GetController();
        var result = await controller.EditUser(account);

        // Assert
        result.Should().NotBeNull();
    }

    [Fact]
    public async Task AccountController_GetAllAccountsByPage_ReturnOk()
    {
        List<Account> allAccounts = A.Fake<List<Account>>();
        int pageSize = 1;
        int pageNumber = 1;
        A.CallTo(() => _accountService.GetAccountsByPage(pageSize, pageNumber)).Returns(Task.FromResult(allAccounts));

        // Act
        var controller = GetController();
        var result = await controller.getAllAccountsByPage(pageSize, pageNumber);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }

    [Fact]
    public async Task AccountController_EditAccount_ReturnOk()
    {
        UserDTO account = A.Fake<UserDTO>();
        UserDTO userCreate = new UserDTO
        {
            UserId = account.UserId,
            Fullname = account.Fullname,
            Email = account.Email,
            CCCD = account.CCCD,
            Phone = account.Phone,
            Birthdate = account.Birthdate,
            Address = account.Address,
            Gender = account.Gender,
        };
        UserDTO tempAccount = A.Fake<UserDTO>();

        A.CallTo(() => _userService.UpdateUser(userCreate)).Returns(Task.FromResult(tempAccount));

        // Act
        var controller = GetController();
        var result = await controller.EditAccount(account);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }

    [Fact]
    public async Task AccountController_GetAccount_ReturnOk()
    {
        int AccountID = 1;
        AccountBaseDTO tempAccount = A.Fake<AccountBaseDTO>();

        A.CallTo(() => _accountService.GetAccountByID(AccountID)).Returns(tempAccount);
        // Act
        var controller = GetController();
        var result = await controller.getAccount();

        // Assert
        tempAccount.Should().NotBeNull();
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }

    [Fact]
    public async Task AccountController_GetUser_ReturnOk()
    {
        int AccountID = 1;
        UserDomain tempAccount = A.Fake<UserDomain>();
        A.CallTo(() => _userService.GetUserByAccount(AccountID)).Returns(Task.FromResult(tempAccount));

        // Act
        var controller = GetController();
        var result = await controller.getUser(AccountID);

        // Assert
        tempAccount.Should().NotBeNull();
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }

    [Fact]
    public async Task AccountController_DeleteAccountById_ReturnOk()
    {
        int accountId = 1;
        A.CallTo(() => _accountService.DeleteAccount(accountId)).Returns(true);

        // Act
        var controller = GetController();
        var result = await controller.DeleteAccountById(accountId);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }

    [Fact]
    public async Task AccountController_GetAccountByUserId_ReturnOk()
    {
        int userID = 1;
        A.CallTo(() => _accountService.getAccountIdByUserID(userID)).Returns(Task.FromResult(1));

        // Act
        var controller = GetController();
        var result = await controller.getAccountByUserID(userID);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }

    [Fact]
    public async Task AccountController_CreateNewUser_ReturnOk()
    {
        UserDTO account = A.Fake<UserDTO>();
        UserDTO id = A.Fake<UserDTO>();
        A.CallTo(() => _userService.CreateUserGoogle(account)).Returns(Task.FromResult(id));

        // Act
        var controller = GetController();
        var result = await controller.createNewUser(account);

        // Assert
        id.Should().NotBeNull();
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }
}