﻿using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;
using HealthcareSystem.Backend.Models;

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
            var package = await GetAsync(t => t.Packageid == packageId);
            return _mapper.Map<PolicyPackageDomain>(package);
        }
        public async Task<int> CreateNew(string name, string description)
        {
            PolicyPackage packageDetail = new PolicyPackage {
                Name = name,
                Description = description
            };
            await CreateAsync(packageDetail);
            var info = await GetAllAsync(x => x.Name ==  name && x.Description == description);
            var result = info.Last();
            return result.Packageid;
        }

    }
}
