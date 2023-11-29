using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Repositories;
using HealthcareSystem.Backend.Repositories.PolicyPackageRepository;

namespace HealthcareSystem.Backend.Services.PackagePoliceService
{
    public class PackagePoliceService : IPackagePoliceService
    {
        private readonly IBasicPriceRepository _basicPriceRepository;
        private readonly IPolicyPackageRepository _policyPackageRepository;

        public PackagePoliceService(IBasicPriceRepository basicPriceRepository, IPolicyPackageRepository policyPackageRepository)
        {
            _basicPriceRepository = basicPriceRepository;
            _policyPackageRepository = policyPackageRepository;
        }

        public async Task<List<PolicyPackageDomain>> GetAllPolicyPackagesAsync()
        {
            return await _policyPackageRepository.GetAllPolicyPackagesAsync();
        }

        public async Task<BasicPriceDomain> GetBasicPriceOfPackage(int PackageID, int Age, string Gender)
        {
            return await _basicPriceRepository.GetBasicPrice(PackageID, Age, Gender);
        }

        public async Task<PolicyPackageDomain> GetPolicyPackageByIdAsync(int packageId)
        {
            return await _policyPackageRepository.GetPolicyPackageByIdAsync(packageId);
        }
    }
}
