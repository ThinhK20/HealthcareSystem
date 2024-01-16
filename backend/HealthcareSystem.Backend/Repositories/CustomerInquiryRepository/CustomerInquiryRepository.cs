using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Enums;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.AccountRepository;
using HealthcareSystem.Backend.Repositories.GenericRepository;
using HealthcareSystem.Backend.Services.InsuranceDetalService;
using HealthcareSystem.Backend.Utils;

namespace HealthcareSystem.Backend.Repositories
{
    public class CustomerInquiryRepository : Repository<Models.Entity.CustomerInquiry>, ICustomerInquiryRepository
    {

        private readonly IMapper _mapper;
        public CustomerInquiryRepository(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
        }


        public async Task<CustomerInquiryDTO> CreateInquiry(Models.DTO.CustomerInquiryDTO data)
        {
            if (data == null) throw new Exception("Data is null");
            

            CustomerInquiry obj = new CustomerInquiry
            {
                AccountId = data.AccountId,
                FullName = data.FullName,
                Phone = data.Phone,
                Email = data.Email,
                DateQuestion = data.DateQuestion,
                Question = data.Question,
                Status = "Not Solve"

            };

            await CreateAsync(obj);
 
            return data;
        }
    }
}
