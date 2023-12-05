using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;

namespace HealthcareSystem.Backend.Services.UserService
{
    public interface IUserService
    {
        public Task<CustomerRequestCreateDTO> CreateCustomerRequestAsync(CustomerRequestCreateDTO customerRequest);
        public Task<bool> DeleteCustomerRequestByIdAsync(int requestId);
        public Task<List<CustomerRequestDomain>> GetAllCustomerRequestsAsync();
        public Task<CustomerRequestDomain> GetCustomerRequestByIdAsync(int requestId);
        public Task<UserPriceDomain> GetUserInfoForPriceByIdAsync(int UserID);
        public Task<double> GetFeesIncrease(int UserID);
        public Task<PaymentDomain> AcceptCustomerRequest(int Accept);
        public Task<bool> RefusedCustomerRequest(int id);
        public Task<bool> CompleteCustomerRequest(int id);


    }
}
