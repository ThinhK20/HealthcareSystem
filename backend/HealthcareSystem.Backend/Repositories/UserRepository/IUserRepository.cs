using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories
{
    public interface IUserRepository: IRepository<Models.Entity.User>
    {
        public Task<UserPriceDomain> GetUserInfoForPriceByIdAsync(int UserID);

        public Task<UserDomain> GetUserByAccount(int AccountId);

    }
}
