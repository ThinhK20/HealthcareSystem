using AutoMapper;
using Azure.Core;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories
{
    public class UserRepository : Repository<Models.Entity.User>, IUserRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationContext;

        public UserRepository(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _applicationContext = context;
        }

        public async Task<UserPriceDomain> GetUserInfoForPriceByIdAsync(int UserID)
        {
            var UserInfo = await GetAsync(x => x.UserId == UserID);
            if (UserInfo == null) throw new Exception("User not found.");
            return _mapper.Map<UserPriceDomain>(UserInfo);
        }

        public async Task<UserDomain> GetUserByAccount(int AccountId)
        {
            var UserInfo = await GetAsync(x => x.Account.AccountId == AccountId);
            if (UserInfo == null) return null;
            return _mapper.Map<UserDomain>(UserInfo);
        }

    }
}
