using HealthcareSystem.Backend.Models.Domain;

namespace HealthcareSystem.Backend.Services.UserService
{
    public interface IUserService
    {
        public Task<CustomerRequest> CreateCustomerRequestAsync(CustomerRequest customerRequest);
        public Task<bool> DeleteCustomerRequestByIdAsync(int requestId);
        public Task<List<CustomerRequest>> GetAllCustomerRequestsAsync();
        public Task<CustomerRequest> GetCustomerRequestByIdAsync(int requestId);
    }
}
