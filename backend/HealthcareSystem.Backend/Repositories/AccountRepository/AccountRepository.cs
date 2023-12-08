using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.DTO;
<<<<<<< HEAD
=======
using HealthcareSystem.Backend.Models.Entity;
>>>>>>> ce126b1db1c5c86c29b082c763ddeee251244df6
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
<<<<<<< HEAD
      
=======
        public async Task<AccountBaseDTO> CreateAccountStaff(AccountBaseDTO acc)
        {
            if(acc==null) throw new Exception("Have not Input");
            bool checkExist = await checkUserExist(acc.Username);
            if(checkExist == true) {
                throw new Exception("Username exist");
            }
            Models.Entity.Account account = _mapper.Map<Models.Entity.Account>(acc);
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
            Models.Entity.Account account = _mapper.Map<Models.Entity.Account>(temp);
            await UpdateAsync(account);
            return acc;


        }
        public async Task<AccountBaseDTO> GetAccountByID(int id)
        {
            var data = await GetAsync(x => x.UserId == id);
            if(data == null) throw new Exception("dont find user");
            return _mapper.Map<AccountBaseDTO>(data);
        }
>>>>>>> ce126b1db1c5c86c29b082c763ddeee251244df6
    }
}
