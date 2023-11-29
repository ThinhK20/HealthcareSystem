using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.Entity;

namespace HealthcareSystem.Backend.Services.InsuranceDetalService
{
    public interface IInsuranceDetailService
    {
        public Task<List<InsuranceDetailDomain>> GetByIdAsync(int insuraceID);
        public Task<InsuranceDetail> AddInsuranceDatail(InsuranceDetailDomain insuranceDetail);
    }
}
