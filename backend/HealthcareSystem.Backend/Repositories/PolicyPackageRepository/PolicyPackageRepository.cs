using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Models.DTO;

namespace HealthcareSystem.Backend.Repositories.PolicyPackageRepository
{
    public class PolicyPackageRepository : Repository<PolicyPackage>, IPolicyPackageRepository
    {
        private readonly IMapper _mapper;
        public PolicyPackageRepository(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
        }

        public async Task<List<PolicyPackageDomain>> GetAllPolicyPackagesAsync()
        {
            var packages = await GetAllAsync();
            return packages.Select(t => _mapper.Map<PolicyPackageDomain>(t)).ToList();
        }

        public async Task<PolicyPackageDomain> GetPolicyPackageByIdAsync(int packageId)
        {
            var package = await GetAsync(t => t.Packageid == packageId,true, "PackageDetails,BasicPrices,PackageDetails.InsurancePolicy");
            if (package == null) throw new Exception("No Package info");
            return _mapper.Map<PolicyPackageDomain>(package);
        }
        public async Task<int> CreateNew(string name, string description)
        {
            PolicyPackage packageDetail = new PolicyPackage {
                Name = name,
                Description = description,
                Status = "Active"
            };
            await CreateAsync(packageDetail);
            var info = await GetAllAsync(x => x.Name ==  name && x.Description == description);
            var result = info.Last();
            return result.Packageid;
        }

        public async Task<bool> Edit(PackagePolicyEditDTO packagePolicyEdit)
        {
            var policyPackage = await GetAsync(x => x.Packageid == packagePolicyEdit.Packageid,true, "InsuranceDetails,CustomerRequests,PackageDetails,BasicPrices");
            if (policyPackage == null) throw new Exception("Not found this policy package. Please try again.");

            policyPackage.Name = packagePolicyEdit.Name;
            policyPackage.Description = packagePolicyEdit.Description;
            policyPackage.BasicPrices = packagePolicyEdit.BasicPrices.Select(t => _mapper.Map<BasicPrice>(t)).ToList();
            policyPackage.PackageDetails = packagePolicyEdit.PackageDetails.Select(t => _mapper.Map<PackageDetail>(t)).ToList();

            await UpdateAsync(policyPackage);
            return true;
        }

        public async Task<bool> InActive(PolicyPackage policyPackage)
        {
            policyPackage.Status = "InActive";
            await UpdateAsync(policyPackage);
            return true;

        }

        public async Task<bool> Active(PolicyPackage policyPackage)
        {
            policyPackage.Status = "Active";
            await UpdateAsync(policyPackage);
            return true;

        }

        public async Task<PolicyPackage> GetPolicyPackageActiveByIdAsync(int packageId)
        {
            var package = await GetAsync(t => t.Packageid == packageId && t.Status == "Active");
            return package;
        }

        public async Task<PolicyPackage> GetPolicyPackageInActiveByIdAsync(int packageId)
        {
            var package = await GetAsync(t => t.Packageid == packageId && t.Status == "InActive");
            return package;
        }
    }
}
