using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Enums;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.AccountRepository
{
    public class AccountRepository : Repository<Models.Entity.Account>, IAccountRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationContext;

        public AccountRepository(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _applicationContext = context;
        }

        public async Task<List<Models.Domain.Account>> GetUser()
        {
            var user = await GetAllAsync();
            if (user == null) throw new Exception("Don't have any users.");
            return _mapper.Map<List<Models.Domain.Account>>(user);
        }
        
        public async Task<List<Models.Domain.Account>> GetAccountsByPage(int pageSize, int pageNumber)
        {
            var user = await GetAllAsync(pageNumber:pageNumber, pageSize: pageSize);
            if (user == null) throw new Exception("Don't have any users.");
            return _mapper.Map<List<Models.Domain.Account>>(user);
        }
        
        public async Task<bool> checkUserExist(string Username)
        {
            var user = await GetAsync(u => u.Username == Username && u.Status != AccountStatus.Deleted);
            if (user == null)
            {
                return false;
            }
            return true;
        }
        public async Task<int> getLength()
        {
            var user = await GetAllAsync();
            return user.Count();
        }

        public async Task<AccountBaseDTO> CreateAccountStaff(AccountBaseDTO acc)
        {
            if (acc == null) throw new Exception("Have not Input");
            bool checkExist = await checkUserExist(acc.Username);
            if (checkExist == true)
            {
                throw new Exception("Username exist");
            }
            var salt = BCrypt.Net.BCrypt.GenerateSalt();
            var hashedOldPassword = BCrypt.Net.BCrypt.HashPassword(acc.Password, salt);
            Models.Entity.Account account = _mapper.Map<Models.Entity.Account>(acc);
            account.Password = hashedOldPassword;
            await CreateAsync(account);
            var newAccount = await GetAsync(filter => filter.Username == acc.Username && filter.Status != AccountStatus.Deleted);
            return _mapper.Map<AccountBaseDTO>(newAccount);
        }

        public async Task<AccountBaseDTO> UpdateAccountStaff(AccountBaseDTO acc)
        {

            if (acc == null) throw new Exception("Have not Input");
            bool checkExist = await checkUserExist(acc.Username);
            if (checkExist != true)
            {
                throw new Exception("Username exist");
            }
            var temp = await GetAsync(x => x.AccountId == acc.AccountId && x.Status != AccountStatus.Deleted);
            temp.Password = acc.Password;
            Models.Entity.Account account = temp;
            await UpdateAsync(account);
            return acc;

        }
        public async Task<AccountBaseDTO> updatePassword(PasswordDTO acc)
        {
            // Validate input parameters
            if (acc == null) throw new ArgumentNullException(nameof(acc));

            if (acc.OldPassword == acc.NewPassword)
            {
                throw new ArgumentException("New password must be different from the old password", nameof(acc.NewPassword));
            }

            var oldPassword = await GetAsync(x => x.AccountId == acc.AccountId && x.Status != AccountStatus.Deleted);

            if (oldPassword == null)
            {
                throw new ArgumentException("Invalid Account ID", nameof(acc.AccountId));
            }

            // Check username after ensuring oldPassword is not null
            if (acc.Username != oldPassword.Username)
            {
                throw new ArgumentException("Invalid Username", nameof(acc.Username));
            }

            var isPasswordValid = BCrypt.Net.BCrypt.Verify(acc.OldPassword, oldPassword.Password);

            if (!isPasswordValid)
            {
                throw new InvalidOperationException("Invalid Old Password");
            }

            var salt = BCrypt.Net.BCrypt.GenerateSalt();
            var newPassword = BCrypt.Net.BCrypt.HashPassword(acc.NewPassword, salt);

            oldPassword.Password = newPassword;

            await UpdateAsync(oldPassword);

            return _mapper.Map<AccountBaseDTO>(oldPassword);
        }
        public async Task<AccountBaseDTO> GetAccountByID(int id)
        {
            var data = await GetAsync(x => x.AccountId == id && x.Status != AccountStatus.Deleted);
            if (data == null) throw new Exception("dont find user");
            return _mapper.Map<AccountBaseDTO>(data);
        }
        public async Task<bool> UpdateStatus(int userid)
        {
            if (userid == null) throw new Exception("Have not Input");
            var data = await GetAsync(x => x.UserId == userid && x.Status != AccountStatus.Deleted);
            bool checkExist = await checkUserExist(data.Username);
            if (checkExist != true)
            {
                return false;
            }
            data.Status = AccountStatus.Active;
            await UpdateAsync(data);
            return true;
        }

        public async Task<bool> DeleteAccount(int accountId)
        {
            var account = await GetAsync(x => x.AccountId == accountId && x.Status != AccountStatus.Deleted);
            if (account == null) throw new Exception("User not found.");
            account.Status = AccountStatus.Deleted;
            await UpdateAsync(account);
            return true;
        }
        public async Task<int> getAccountIdByUserID(int userid)
        {
            var account = await GetAsync(u => u.UserId == userid);
            if (account == null) throw new Exception("User not found.");
            return account.AccountId;
        }
        public async Task<List<AccountGetDTO>> GetAllAccount()
        {
            var list = await GetAllAsync();
            if(list ==null) throw new NotImplementedException();

            return _mapper.Map<List<AccountGetDTO>>(list);
        }
    }
}
