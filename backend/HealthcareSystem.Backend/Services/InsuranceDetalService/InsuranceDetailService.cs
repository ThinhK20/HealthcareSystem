

using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.Entity;

namespace HealthcareSystem.Backend.Services.InsuranceDetalService
{
    public class InsuranceDetailService : IInsuranceDetailService
    {
        IInsuranceDetailService _insuranceService;
        public InsuranceDetailService(IInsuranceDetailService insuranceService)
        {
            _insuranceService= insuranceService;
        }

        public async Task<InsuranceDetail> AddInsuranceDatail(InsuranceDetailDomain insuranceDetail)
        {
            return await _insuranceService.AddInsuranceDatail(insuranceDetail);
        }

        public async Task<List<InsuranceDetailDomain>> GetByIdAsync(int insuraceID)
        {
          return await _insuranceService.GetByIdAsync(insuraceID);  
        }
    }
}
