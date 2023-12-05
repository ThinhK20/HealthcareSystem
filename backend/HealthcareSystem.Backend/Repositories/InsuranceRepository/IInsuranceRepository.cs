using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.InsuranceRepository
{
    public interface IInsuranceRepository : IRepository<Insurance>
    {
        public Task<List<InsuranceDomain>> GetAllInsurancesAsync();
        public Task<InsuranceDomain> GetInsuranceByIdAsync(int insuranceId);
    }
}
