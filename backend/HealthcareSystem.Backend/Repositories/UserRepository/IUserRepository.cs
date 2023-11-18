using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.UserRepository
{
    public interface IUserRepository : IRepository<Models.Entity.CustomerRequest>
    {
        public Task<CustomerRequest> CreateCustomerRequestAsync(CustomerRequest customerRequest);
    }
}
