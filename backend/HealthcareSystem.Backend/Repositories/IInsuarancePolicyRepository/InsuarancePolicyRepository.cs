using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.IInsuarancePolicyRepository
{
    public class InsuarancePolicyRepository : Repository<InsurancePolicy>, IInsuarancePolicyRepository
    {
        private readonly ApplicationDbContext _context;
        public InsuarancePolicyRepository(ApplicationDbContext context) : base(context) 
        {
            _context = context;
        }



    }
}
