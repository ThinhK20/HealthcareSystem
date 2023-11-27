using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories
{
    public class InsurancePolicyRepository : Repository<InsurancePolicy>, IInsurancePolicyRepository
    {
        public InsurancePolicyRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
