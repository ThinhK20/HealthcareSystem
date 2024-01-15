using AutoMapper;
using HealthcareSystem.Backend.Enums;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Services.AccountService;
using HealthcareSystem.Backend.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthcareSystem.Backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    // [Authorize]
    public class AccountsController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        public AccountsController(IAccountService accountService, IMapper mapper, IUserService userService)
        {
            _accountService = accountService;
            _mapper = mapper;
            _userService = userService;
        }
        // [Authorize(Roles = Roles.AdminRole)]
        [HttpPost("create-new-staff")]
        public async Task<IActionResult> CreateAccountStaff([FromBody] AccountUserDTO account)
        {
            if (account == null)
            {
                return BadRequest();
            }
            if (account.Role != Roles.NormalStaffRole && account.Role != Roles.AccountantRole && account.Role != Roles.AdminRole && account.Role != Roles.UserRole && account.Role != Roles.CustomerCareRole) return BadRequest();
            UserDTO userCreate = new UserDTO
            {
                Fullname = account.Fullname,
                Email = account.Email,
                CCCD = account.CCCD,
                Phone = account.Phone,
                Birthdate = account.Birthdate,
                Address = account.Address,
                Gender = account.Gender,
            };
            var tempUser = await _userService.CreateUser(userCreate);
            if (tempUser == null)
            {
                return BadRequest("Failed to create user.");
            }

            AccountBaseDTO accCreate = new AccountBaseDTO
            {
                UserId = tempUser.UserId,
                Username = account.Username,
                Password = account.Password,
                Status = account.Status,
                Role = account.Role
            };
            var tempAccount = await _accountService.CreateAccountStaff(accCreate, account.Email);
            if (tempAccount == null)
            {
                return BadRequest("Failed to create account.");
            }

            return Ok(tempAccount);
        }
        [Authorize(Roles = Roles.AdminRole)]
        [HttpPut("edit-account-staff")]
        public async Task<IActionResult> EditUser([FromBody] AccountBaseDTO account)
        {
            if (account.Role != Roles.NormalStaffRole && account.Role != Roles.AccountantRole && account.Role != Roles.AdminRole && account.Role != Roles.UserRole && account.Role != Roles.CustomerCareRole) return BadRequest();

            AccountBaseDTO accCreate = new AccountBaseDTO
            {
                AccountId = account.AccountId,
                UserId = account.UserId,
                Username = account.Username,
                Password = account.Password,
                Status = account.Status,
                Role = account.Role
            };
            var tempAccount = await _accountService.UpdateAccountStaff(accCreate);
            if (tempAccount == null)
            {
                return BadRequest("Failed to create account.");
            }

            return Ok(tempAccount);
        }
        [Authorize(Roles = Roles.AdminRole + "," + Roles.NormalStaffRole + "," + Roles.AccountantRole)]
        [HttpGet("get-all-account")]
        public async Task<IActionResult> getAccount()
        {
            var allAccount = await _accountService.GetAllAccount();
            return Ok(allAccount);
        }

        [HttpGet("get-all-account/page")]
        public async Task<IActionResult> getAllAccountsByPage([FromQuery] int pageSize, [FromQuery] int pageNumber)
        {
            try
            {
                var allAccounts = await _accountService.GetAccountsByPage(pageSize, pageNumber);
                return Ok(allAccounts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("edit-user")]
        public async Task<IActionResult> EditAccount([FromBody] UserDTO account)
        {
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
            var tempAccount = await _userService.UpdateUser(userCreate);
            if (tempAccount == null)
            {
                return BadRequest("Failed to create account.");
            }

            return Ok(tempAccount);
        }
        [HttpPut("change-password")]
        public async Task<IActionResult> changePass([FromBody] PasswordDTO account)
        {
            var changePass = await _accountService.updatePassword(account);

            if (changePass == null)
            {
                return BadRequest("Failed to create account.");
            }

            return Ok(changePass);
        }
        [HttpGet("get-account-by-id/{id:int}")]
        public async Task<IActionResult> getAccount([FromRoute(Name = "id")] int AccountID)
        {

            var tempAccount = await _accountService.GetAccountByID(AccountID);
            if (tempAccount == null)
            {
                return BadRequest("Failed to create account.");
            }

            return Ok(tempAccount);
        }
        [HttpGet("get-user-by-account/{id:int}")]
        public async Task<IActionResult> getUser([FromRoute(Name = "id")] int AccountID)
        {

            var tempAccount = await _userService.GetUserByAccount(AccountID);
            if (tempAccount == null)
            {
                return BadRequest("Failed to create account.");
            }

            return Ok(tempAccount);
        }
        [Authorize(Roles = Roles.AdminRole)]
        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> DeleteAccountById([FromRoute(Name = "id")] int accountId)
        {
            try
            {
                var result = await _accountService.DeleteAccount(accountId);
                return Ok("Delete account successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getAccountIdByUserID/{id:int}")]
        public async Task<IActionResult> getAccountByUserID([FromRoute(Name = "id")] int userID)
        {

            var id = await _accountService.getAccountIdByUserID(userID);
            if (id == null)
            {
                return BadRequest("Failed to get account id.");
            }

            return Ok(id);
        }
        [HttpPost("createNewUser")]
        public async Task<IActionResult> createNewUser([FromBody] UserDTO account)
        {

            var id = await _userService.CreateUserGoogle(account);

            if (id == null)
            {
                return BadRequest("Failed to create user.");
            }

            return Ok(id);
        }


    }
}
