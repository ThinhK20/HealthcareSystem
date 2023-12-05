using AutoMapper;
using HealthcareSystem.Backend.Data;
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
    }
}
