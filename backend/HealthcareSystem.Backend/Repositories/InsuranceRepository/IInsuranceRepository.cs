using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.InsuranceRepository
{
    public interface IInsuranceRepository : IRepository<Insurance>
    {
        public Task<List<InsuranceDomain>> GetAllInsurancesAsync();

        public Task<List<InsuranceDomain>> GetInsurancesOnPage(Pagination infoPage);

        public Task<InsuranceDomain> GetInsuranceByIdAsync(int insuranceId);

        public Task<InsuranceDomain> Delete(int insuranceId);
        public Task<InsuranceDTO> CreateInsurance(Models.DTO.InsuranceDTO data);
        public Task<InsuranceUpdateDTO> UpdateInsurance(Models.DTO.InsuranceUpdateDTO data);

 

    }
}
