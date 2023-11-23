using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories
{
    public interface IFeeAffectRepository: IRepository<FeeAffect>
    {
        public Task<List<FeeAffectDomain>> GetAll();
    }
}
