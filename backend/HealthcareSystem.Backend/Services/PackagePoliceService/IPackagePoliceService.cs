using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;

namespace HealthcareSystem.Backend.Services.PackagePoliceService
{
    public interface IPackagePoliceService
    {
        Task<BasicPriceDomain> GetBasicPriceOfPackage(int PackageID, int Age, string Gender);

        public Task<List<PolicyPackageDomain>> GetAllPolicyPackagesAsync();
        public Task<PolicyPackageDomain> GetPolicyPackageByIdAsync(int packageId);
        public Task<bool> CreateNewPackage(PackagePolicyCreateDTO detailCreate);
    }
}
