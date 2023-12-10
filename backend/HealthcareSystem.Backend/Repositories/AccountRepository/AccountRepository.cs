using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.DTO;

using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;
using Microsoft.AspNetCore.Server.IIS.Core;
using System.Net.WebSockets;

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
        public  async Task<bool> checkUserExist(string Username)
        {
            var user =  await GetAsync(u => u.Username == Username);
            if(user == null)
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
            if(acc==null) throw new Exception("Have not Input");
            bool checkExist = await checkUserExist(acc.Username);
            if(checkExist == true) {
                throw new Exception("Username exist");
            }
            var salt = BCrypt.Net.BCrypt.GenerateSalt();
            var hashedOldPassword = BCrypt.Net.BCrypt.HashPassword(acc.Password, salt);
            Models.Entity.Account account = _mapper.Map<Models.Entity.Account>(acc);
            account.Password = hashedOldPassword;
            await CreateAsync(account);
            var newAccount = await GetAsync(filter => filter.Username == acc.Username);
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
            var temp = await GetAsync(x=>x.AccountId == acc.AccountId);
            temp.Password = acc.Password;
            Models.Entity.Account account = temp;
            await UpdateAsync(account);
            return acc;

        }
        public async Task<AccountBaseDTO> updatePassword(PasswordDTO acc)
        {
            if(acc.OldPassword==acc.NewPassword) { throw new Exception("Password is alike"); }
            var oldPassword = await GetAsync(x=>x.AccountId==acc.AccountId);
            if (oldPassword == null) throw new Exception("AccountID Invalid");
            if (acc.Username != oldPassword.Username) { throw new Exception("Username invalid"); }
            if(oldPassword==null) { throw new Exception("Dont find Account"); }
            var salt = BCrypt.Net.BCrypt.GenerateSalt();
            var isPasswordValid = BCrypt.Net.BCrypt.Verify(acc.OldPassword, oldPassword.Password);
            if (!isPasswordValid) { throw new Exception("Invalid Password"); }
            var newPassword = BCrypt.Net.BCrypt.HashPassword(acc.NewPassword, salt);
            oldPassword.Password= newPassword;
            await UpdateAsync(oldPassword);
            return _mapper.Map< AccountBaseDTO >(oldPassword);
        }
        public async Task<AccountBaseDTO> GetAccountByID(int id)
        {
            var data = await GetAsync(x => x.AccountId == id);
            if(data == null) throw new Exception("dont find user");
            return _mapper.Map<AccountBaseDTO>(data);
        }
        public async Task<bool> UpdateStatus(int userid)
        {
            if (userid == null) throw new Exception("Have not Input");
            var data = await GetAsync(x => x.UserId == userid);
            bool checkExist = await checkUserExist(data.Username);
            if (checkExist != true)
            {
                return false;
            }
            data.Status = "Active";
            await UpdateAsync(data);
            return true;
        }
    }
}
