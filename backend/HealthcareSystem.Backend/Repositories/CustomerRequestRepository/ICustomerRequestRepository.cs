using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories
{
    public interface ICustomerRequestRepository : IRepository<Models.Entity.CustomerRequest>
    {
        public Task<CustomerRequestCreateDTO> CreateCustomerRequest(CustomerRequestCreateDTO customerRequest);
        public Task<bool> DeleteCustomerRequestByIdAsync(int requestId);
        public Task<List<CustomerRequestDomain>> GetAllCustomerRequestsAsync();
        public Task<CustomerRequestDomain> GetCustomerRequestByIdAsync(int requestId);
        public Task<AcceptCustomerRequestResponeDomain> AcceptCustomerRequest(int Accept, int StaffId);
        public Task<bool> CompleteCustomerRequest(int id);
        public Task<bool> RefusedCustomerRequest(int id);
    }
}
