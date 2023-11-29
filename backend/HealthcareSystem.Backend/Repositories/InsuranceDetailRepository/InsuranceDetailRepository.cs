using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.InsuranceDetailRepository
{
    public class InsuranceDetailRepository : Repository<InsuranceDetail>, IInsuranceDetailRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationContext;
      
        public InsuranceDetailRepository(ApplicationDbContext context,IMapper mapper) : base(context)
        {
            _applicationContext = context;
            _mapper = mapper;
        }

        public async Task<InsuranceDetail> AddInsuranceDatail(InsuranceDetailDomain insuranceDetail)
        {
            if (insuranceDetail == null) throw new Exception("Data is null");
            Models.Entity.InsuranceDetail entity = _mapper.Map<Models.Entity.InsuranceDetail>(insuranceDetail);
            await CreateAsync(entity);
            return entity;
        }

        public async Task<List<InsuranceDetailDomain>> GetByIdAsync(int insuraceID)
        {
            if(insuraceID ==null) throw new Exception("Data is null");
            var data =  await GetAllAsync(x=>x.InsureID == insuraceID);
            var result = _mapper.Map<List<InsuranceDetailDomain>>(data);
            return result;
        }
    }
}

