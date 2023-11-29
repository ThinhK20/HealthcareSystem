

using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories;
using HealthcareSystem.Backend.Repositories.InsuranceDetailRepository;

namespace HealthcareSystem.Backend.Services.InsuranceDetalService
{
    public class InsuranceDetailService : IInsuranceDetailService
    {
        private readonly IInsuranceDetailRepository _insuranceDetailRepository;
        public InsuranceDetailService(IInsuranceDetailRepository insuranceDetailRepository)
        {
            _insuranceDetailRepository = insuranceDetailRepository;
        }

        public async Task<InsuranceDetail> AddInsuranceDatail(InsuranceDetailDomain insuranceDetail)
        {
            return await _insuranceDetailRepository.AddInsuranceDatail(insuranceDetail);
        }

        public async Task<List<InsuranceDetailDomain>> GetByIdAsync(int insuraceID)
        {
          return await _insuranceDetailRepository.GetByIdAsync(insuraceID);  
        }
    }
}
