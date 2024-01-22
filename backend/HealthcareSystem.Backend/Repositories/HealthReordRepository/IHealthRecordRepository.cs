using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories
{
  
    public interface IHealthRecordRepository: IRepository<Models.Entity.HealthRecord>
    {
        public Task<int> GetMaxPhaseHealthRecord(int UserId);
        public Task<Dictionary<int, int>> GetListFeeAffectId(int UserId);

        public Task<List<HealthRecordDomain>> GetListHR(int UserId);

        public Task<bool> InsertData(HealthRecord data);

    }
}
