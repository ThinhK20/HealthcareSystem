using HealthcareSystem.Backend.Models.Domain;

namespace HealthcareSystem.Backend.Services.UserService
{
    public interface IUserService
    {
        public Task<CustomerRequestDomain> CreateCustomerRequestAsync(CustomerRequestDomain customerRequest);
        public Task<bool> DeleteCustomerRequestByIdAsync(int requestId);
        public Task<List<CustomerRequestDomain>> GetAllCustomerRequestsAsync();
        public Task<CustomerRequestDomain> GetCustomerRequestByIdAsync(int requestId);
        public Task<UserPriceDomain> GetUserInfoForPriceByIdAsync(int UserID);

        public Task<double> GetFeesIncrease(int UserID);

    }
}
