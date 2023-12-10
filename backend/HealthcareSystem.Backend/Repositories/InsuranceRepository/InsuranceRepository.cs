using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.InsuranceRepository
{
    public class InsuranceRepository : Repository<Insurance>, IInsuranceRepository
    {
        private readonly IMapper _mapper;
        public InsuranceRepository(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
        }

        public async Task<List<InsuranceDomain>> GetAllInsurancesAsync()
        {
            var insurances = await GetAllAsync(includeProperites: "Account,InsuranceDetails", tracked: false);
            return insurances.Select(t => _mapper.Map<InsuranceDomain>(t)).ToList();
        }

        public async Task<InsuranceDomain> GetInsuranceByIdAsync(int insuranceId)
        {
            return _mapper.Map<InsuranceDomain>(await GetAsync(t => t.InsuranceID == insuranceId, false, "Account,InsuranceDetails"));
        }
    }
}
