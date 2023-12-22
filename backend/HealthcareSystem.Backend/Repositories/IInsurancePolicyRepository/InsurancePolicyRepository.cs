using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories
{
    public class InsurancePolicyRepository : Repository<InsurancePolicy>, IInsurancePolicyRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationContext;
        public InsurancePolicyRepository(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _applicationContext = context;

        }

        public async Task<InsurancePolicy> GetByIdAsync(int id)
        {
            return await GetAsync(x => x.PolicyID == id);
        }
    }
}
