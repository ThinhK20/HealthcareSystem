using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories
{
    public class InsuarancePolicyRepository : Repository<InsurancePolicy>, IInsuarancePolicyRepository
    {
        public InsuarancePolicyRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
