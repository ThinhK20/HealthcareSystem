using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.PolicyPackageRepository
{
    public interface IPolicyPackageRepository : IRepository<Models.Entity.PolicyPackage>
    {
        public Task<int> CreateNew(string name, string description);
        public Task<List<PolicyPackageDomain>> GetAllPolicyPackagesAsync();
        public Task<PolicyPackageDomain> GetPolicyPackageByIdAsync(int packageId);
    }
}
