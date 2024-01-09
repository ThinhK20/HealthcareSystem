using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.PolicyPackageRepository
{
    public interface IPolicyPackageRepository : IRepository<Models.Entity.PolicyPackage>
    {
        public Task<int> CreateNew(string name, string description);
        public Task<bool> Edit(PackagePolicyEditDTO packagePolicyEdit);

        public Task<List<PolicyPackageDomain>> GetAllPolicyPackagesAsync();
        public Task<PolicyPackageDomain> GetPolicyPackageByIdAsync(int packageId);

        public Task<PolicyPackage> GetPolicyPackageActiveByIdAsync(int packageId);
        public Task<PolicyPackage> GetPolicyPackageInActiveByIdAsync(int packageId);

        public Task<bool> InActive(PolicyPackage policyPackage);
        public Task<bool> Active(PolicyPackage policyPackage);

    }
}
