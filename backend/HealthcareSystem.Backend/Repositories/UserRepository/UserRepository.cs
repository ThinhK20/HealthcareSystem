using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.UserRepository
{
    public class UserRepository : Repository<Models.Entity.CustomerRequest>, IUserRepository
    {
        private readonly IMapper _mapper;
        public UserRepository(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
        }

        public async Task<CustomerRequest> CreateCustomerRequestAsync(CustomerRequest customerRequest)
        {
            Models.Entity.CustomerRequest entity = _mapper.Map<Models.Entity.CustomerRequest>(customerRequest);
            await CreateAsync(entity);
            return customerRequest;
        }
    }
}
