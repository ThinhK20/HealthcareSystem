using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Repositories;

namespace HealthcareSystem.Backend.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly ICustomerRequestRepository _customerRequestRepository;

        public UserService(ICustomerRequestRepository customerRequestRepository)
        {
            _customerRequestRepository = customerRequestRepository;
        }

        public async Task<CustomerRequest> CreateCustomerRequestAsync(CustomerRequest customerRequest)
        {
            return await _customerRequestRepository.CreateCustomerRequest(customerRequest);
        }

        public async Task<bool> DeleteCustomerRequestByIdAsync(int requestId)
        {
            return await _customerRequestRepository.DeleteCustomerRequestByIdAsync(requestId);
        }

        public async Task<List<CustomerRequest>> GetAllCustomerRequestsAsync()
        {
            return await _customerRequestRepository.GetAllCustomerRequestsAsync();
        }

        public async Task<CustomerRequest> GetCustomerRequestByIdAsync(int requestId)
        {
            return await _customerRequestRepository.GetCustomerRequestByIdAsync(requestId);
        }
    }
}
