using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.InsuranceDetailRepository
{
    public interface IInsuranceDetailRepository : IRepository<InsuranceDetail>
    {
        public Task<List<InsuranceDetailDomain>> GetByIdAsync(int insuraceID);
        public Task<InsuranceDetail> AddInsuranceDatail(InsuranceDetailDomain insuranceDetail);
        //public Task<InsuranceDetail> AddInsuranceDatail(int packageId, int AccountId);

        public Task<List<InsuranceDetailDomainWithoutFKInsurance>> GetDetailByIdAsync(int insuraceID);

    }
}
