using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.InsuranceDetailRepository
{
    public interface IInsuranceDetailRepository : IRepository<InsuranceDetail>
    {
        public Task<List<InsuranceDetailDomain>> GetByIdAsync(int insuraceID);
        public Task<InsuranceDetailDomain> GetBy2IdAsync(int insuraceID,int packageID);

        public Task<InsuranceDetail> AddInsuranceDatail(InsuranceDetailDomain insuranceDetail);
        //public Task<InsuranceDetail> AddInsuranceDatail(int packageId, int AccountId);

        public Task<List<InsuranceDetailDomainWithoutFKInsurance>> GetDetailByIdAsync(int insuraceID);
        public Task<bool> UpdateStatusBy2Id(int insuraceID,int packageID,string periodic,string status);

    }
}
