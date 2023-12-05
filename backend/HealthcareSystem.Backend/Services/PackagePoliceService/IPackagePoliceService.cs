using HealthcareSystem.Backend.Models.Domain;

namespace HealthcareSystem.Backend.Services.PackagePoliceService
{
    public interface IPackagePoliceService
    {
        Task<BasicPriceDomain> GetBasicPriceOfPackage(int PackageID, int Age, string Gender);

        public Task<List<PolicyPackageDomain>> GetAllPolicyPackagesAsync();
        public Task<PolicyPackageDomain> GetPolicyPackageByIdAsync(int packageId);
    }
}
