using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;

namespace HealthcareSystem.Backend.Services.PackagePoliceService
{
    public interface IPackagePoliceService
    {
        Task<BasicPriceDomain> GetBasicPriceOfPackage(int PackageID, int Age, string Gender);

        public Task<List<PolicyPackageDomain>> GetAllPolicyPackagesAsync();
        public Task<PolicyPackageDomain> GetPolicyPackageByIdAsync(int packageId);
        public Task<bool> CreateNewPackage(PackagePolicyCreateDTO detailCreate);
        public Task<bool> EditPackage(PackagePolicyEditDTO packagePolicyEdit);
        public Task<bool> InActivePackage(int packageId);
        public Task<bool> ActivePackage(int packageId);
        public Task<PackageDetail> GetPackageDetails(int Packageid, int PolicyId);

    }
}
