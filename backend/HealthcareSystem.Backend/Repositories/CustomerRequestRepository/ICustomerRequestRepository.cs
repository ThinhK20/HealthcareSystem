using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories
{
    public interface ICustomerRequestRepository : IRepository<Models.Entity.CustomerRequest>
    {
        public Task<CustomerRequest> CreateCustomerRequest(CustomerRequest customerRequest);
        public Task<bool> DeleteCustomerRequestByIdAsync(int requestId);
        public Task<List<CustomerRequest>> GetAllCustomerRequestsAsync();
        public Task<CustomerRequest> GetCustomerRequestByIdAsync(int requestId);
    }
}
