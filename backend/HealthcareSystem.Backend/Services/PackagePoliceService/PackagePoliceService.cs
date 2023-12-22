using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories;
using HealthcareSystem.Backend.Repositories.PolicyPackageRepository;

namespace HealthcareSystem.Backend.Services.PackagePoliceService
{
    public class PackagePoliceService : IPackagePoliceService
    {
        private readonly IBasicPriceRepository _basicPriceRepository;
        private readonly IPolicyPackageRepository _policyPackageRepository;
        private readonly IPackageDetailRepository _packageDetailRepository;
        private readonly IInsurancePolicyRepository _insurancePolicyRepository;

        public PackagePoliceService(IBasicPriceRepository basicPriceRepository, IPolicyPackageRepository policyPackageRepository, IPackageDetailRepository packageDetailRepository, IInsurancePolicyRepository insurancePolicyRepository)
        {
            _basicPriceRepository = basicPriceRepository;
            _policyPackageRepository = policyPackageRepository;
            _packageDetailRepository = packageDetailRepository;
            _insurancePolicyRepository = insurancePolicyRepository;
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
        public async Task<bool> CreateNewPackage(PackagePolicyCreateDTO detailCreate)
        {
            foreach(var item in detailCreate.packageDetailCreates)
            {
                var insurancePolicy = await _insurancePolicyRepository.GetByIdAsync(item.PolicyId);
                if (insurancePolicy == null)
                {
                    return false;
                }
            }
            int PackageId = await _policyPackageRepository.CreateNew(detailCreate.name, detailCreate.Description);
            foreach (var item in detailCreate.packageDetailCreates)
            {
                await _packageDetailRepository.CreatePackageDetail(item,PackageId);
            }
            for (int i = 0; i < detailCreate.basicPriceCreates.Count;i++)
            {
                var item = detailCreate.basicPriceCreates[i];
                await _basicPriceRepository.CreateNew(item,PackageId,i);
            }
            return true;
        }
    }
}
