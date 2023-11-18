
using HealthcareSystem.Backend.Models.Domain;

namespace HealthcareSystem.Backend.Services.UserService
{
    public interface IUserService
    {
        public Task<CustomerRequest> CreateCustomerRequestAsync(CustomerRequest customerRequest);
    }
}
