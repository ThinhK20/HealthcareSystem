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
            foreach (var item in detailCreate.packageDetailCreates)
            {
                if (item.PayoutPrice > 1 || item.MaxRefundPerDay <= 0 || item.MaxRefundPerYear <= 0 || item.MaxRefundPerExamination <= 0)
                {
                    return false;
                }
                var insurancePolicy = await _insurancePolicyRepository.GetByIdAsync(item.PolicyId);
                if (insurancePolicy == null)
                {
                    return false;
                }
            }

            for (var i = 0; i< detailCreate.basicPriceCreates.Count; i++)
            {
                var item = detailCreate.basicPriceCreates[i];
                if (item.Price <= 0) return false;
                if (item.FromAge > item.ToAge) return false;
                if (item.Gender != "Male" && item.Gender != "Female") return false;
                var temp = detailCreate.basicPriceCreates.FindAll(x => x.Gender == item.Gender && x.ToAge == item.ToAge && x.FromAge == item.FromAge);
                if (temp.Count > 1) return false;
                for (var j = i + 1; j< detailCreate.basicPriceCreates.Count; j++)
                {
                    var item2 = detailCreate.basicPriceCreates[j];
                    if (item2.Gender == item.Gender && ((item2.FromAge <= item.FromAge && item2.ToAge >= item.FromAge) || (item2.FromAge <= item.ToAge && item2.ToAge >= item.ToAge) || (item2.FromAge >= item.FromAge && item2.ToAge <= item.ToAge) || (item2.FromAge > item2.ToAge))) return false;
                }
            }


            int PackageId = await _policyPackageRepository.CreateNew(detailCreate.name, detailCreate.Description);
            foreach (var item in detailCreate.packageDetailCreates)
            {
                await _packageDetailRepository.CreatePackageDetail(item, PackageId);
            }
            for (int i = 0; i < detailCreate.basicPriceCreates.Count; i++)
            {
                var item = detailCreate.basicPriceCreates[i];
                await _basicPriceRepository.CreateNew(item, PackageId, i);
            }
            return true;
        }

        public async Task<bool> EditPackage(PackagePolicyEditDTO packagePolicyEdit)
        {
            foreach (var item in packagePolicyEdit.PackageDetails)
            {
                if (item.PayoutPrice > 1 || item.MaxRefundPerDay <= 0 || item.MaxRefundPeYear <= 0 || item.MaxRefundPerExamination <= 0)
                {
                    return false;
                }
                var insurancePolicy = await _insurancePolicyRepository.GetByIdAsync(item.PolicyId);
                if (insurancePolicy == null)
                {
                    return false;
                }
            }
            for (var i = 0; i < packagePolicyEdit.BasicPrices.Count; i++)
            {
                var item = packagePolicyEdit.BasicPrices[i];
                if (item.Price <= 0) return false;
                if (item.FromAge > item.ToAge) return false;
                if (item.Gender != "Male" && item.Gender != "Female") return false;
                var temp = packagePolicyEdit.BasicPrices.FindAll(x => x.Gender == item.Gender && x.ToAge == item.ToAge && x.FromAge == item.FromAge);
                if (temp.Count > 1) return false;
                for (var j = i + 1; j < packagePolicyEdit.BasicPrices.Count; j++)
                {
                    var item2 = packagePolicyEdit.BasicPrices[j];
                    if (item2.Gender == item.Gender && ((item2.FromAge <= item.FromAge && item2.ToAge >= item.FromAge) || (item2.FromAge <= item.ToAge && item2.ToAge >= item.ToAge) || (item2.FromAge >= item.FromAge && item2.ToAge <= item.ToAge) || (item2.FromAge > item2.ToAge))) return false;
                }
            }
            await _policyPackageRepository.Edit(packagePolicyEdit);

            return true;
        }
        public async Task<bool> InActivePackage(int packageId)
        {
            var policyPackage = await _policyPackageRepository.GetPolicyPackageActiveByIdAsync(packageId);
            if (policyPackage == null) return false;
            await _policyPackageRepository.InActive(policyPackage);
            return true;
        }

        public async Task<bool> ActivePackage(int packageId)
        {
            var policyPackage = await _policyPackageRepository.GetPolicyPackageInActiveByIdAsync(packageId);
            if (policyPackage == null) return false;
            await _policyPackageRepository.Active(policyPackage);
            return true;
        }
    }
}
