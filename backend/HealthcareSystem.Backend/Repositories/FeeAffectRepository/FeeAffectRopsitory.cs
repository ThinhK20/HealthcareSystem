using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories
{
    public class FeeAffectRopsitory : Repository<FeeAffect>, IFeeAffectRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationContext;
        public FeeAffectRopsitory(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _applicationContext = context;
            _mapper = mapper;
        }

        public async Task<List<FeeAffectDomain>> GetAll()
        {
            var FeeAffects = await GetAllAsync();
            var ListFeeAffects = FeeAffects.Select(t => _mapper.Map<FeeAffectDomain>(t)).ToList();
            return ListFeeAffects;
        }
    }
}
