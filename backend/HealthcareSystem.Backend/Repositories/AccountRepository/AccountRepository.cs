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
    }
}
