using AutoMapper;
using Azure.Core;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories
{
    public class HealRecordRepository : Repository<Models.Entity.HealthRecord>, IHealthRecordRepository
    {

        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationContext;
        public HealRecordRepository(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _applicationContext = context;
        }
        public async Task<Dictionary<int, int>> GetListFeeAffectId(int UserId)
        {
            int maxPhase = await GetMaxPhaseHealthRecord(UserId);
            if (maxPhase == 0) return null;
            var listHealthRecords = await GetAllAsync(x=> x.Phase == maxPhase && x.UserID == UserId);
            Dictionary<int, int> countFeeAffect = new Dictionary<int, int>();
            foreach (var value in listHealthRecords)
            {
                if (countFeeAffect.ContainsKey(value.FeeAffectID))
                {
                    countFeeAffect[value.FeeAffectID] += 1;
                }
                else
                {
                    countFeeAffect[value.FeeAffectID] = 1;
                }
            }
            return countFeeAffect;
        }

        public async Task<int> GetMaxPhaseHealthRecord(int UserId)
        {
            var healthRecords = await GetAllAsync(x => x.UserID == UserId);
            if (healthRecords.Count == 0) return 0;
            int maxPhase = (int)healthRecords.Max(h => h.Phase);
            return maxPhase;
        }
    }
}
