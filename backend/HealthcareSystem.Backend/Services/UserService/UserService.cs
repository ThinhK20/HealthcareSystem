using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Repositories.UserRepository;

namespace HealthcareSystem.Backend.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<CustomerRequest> CreateCustomerRequestAsync(CustomerRequest customerRequest)
        {
            CustomerRequest createdRequest = await userRepository.CreateCustomerRequestAsync(customerRequest);
            if (createdRequest == null) throw new Exception("Failed to create customer request. Please try again !");
            return createdRequest;
        }
    }
}
