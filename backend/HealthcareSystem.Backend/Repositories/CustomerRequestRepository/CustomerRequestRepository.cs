using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories
{
    public class CustomerRequestRepository : Repository<Models.Entity.CustomerRequest>, ICustomerRequestRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationContext;
        public CustomerRequestRepository(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _applicationContext = context;
        }

        public async Task<CustomerRequestCreateDTO> CreateCustomerRequest(CustomerRequestCreateDTO customerRequest)
        {
            if (customerRequest == null) throw new Exception("Customer request not found.");
            Models.Entity.CustomerRequest entity = _mapper.Map<Models.Entity.CustomerRequest>(customerRequest);
            await CreateAsync(entity);
            return customerRequest;
        }

        public async Task<bool> DeleteCustomerRequestByIdAsync(int requestId)
        {
            var existedRequest = await GetAsync(x => x.RequestID == requestId);
            if (existedRequest == null) throw new Exception("Customer request not found.");
            await RemoveAsync(existedRequest);
            return true; ;
        }

        public async Task<List<CustomerRequestDomain>> GetAllCustomerRequestsAsync()
        {
            var entityRequests = await GetAllAsync(null, true, "Account,Staff,Payment,PolicyPackage");
            var customerRequests = entityRequests.Select(t => _mapper.Map<CustomerRequestDomain>(t)).ToList();
            return customerRequests;
        }

        public async Task<CustomerRequestDomain> GetCustomerRequestByIdAsync(int requestId)
        {
            return _mapper.Map<CustomerRequestDomain>(await GetAsync(x => x.RequestID == requestId, true, "Account,Staff,Payment,PolicyPackage"));
        }
    }
}
