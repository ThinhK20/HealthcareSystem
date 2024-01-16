using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.AccountRepository
{
    public interface ICustomerInquiryRepository : IRepository<Models.Entity.CustomerInquiry>
    {

        public Task<CustomerInquiryDTO> CreateInquiry(Models.DTO.CustomerInquiryDTO data);

    }
}
