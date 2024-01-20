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
using System.ComponentModel.DataAnnotations;

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
            if (data.FullName.Trim() == "" || data.Question == "" || data.Email == "") throw new Exception("Data is null");
            var emailChecked = !string.IsNullOrEmpty(data.Email) && new EmailAddressAttribute().IsValid(data.Email);
            if (emailChecked == false)
            {
                throw new Exception("Email not valid");
            }
            CustomerInquiry obj = new CustomerInquiry
            {
                FullName = data.FullName,
                Phone = data.Phone,
                Email = data.Email,
                DateQuestion = data.DateQuestion,
                Question = data.Question,
                Status = "Not Solve",
            };

            await CreateAsync(obj);

            return data;
        }

        public async Task<List<CustomerInquiryResponeDTO>> GetAllInquiry()
        {
            var list = await GetAllAsync(null, true, "Account.User");

            return _mapper.Map<List<CustomerInquiryResponeDTO>>(list);
        }

        public async Task<bool> solveInquiry(InquirySolveDTO data)
        {
            var inquiry = await GetAsync(x => x.InquiryID == data.inquiryId);
            if (inquiry == null)  throw new Exception("No inquiry");
            inquiry.Status = "Solved";
            inquiry.StaffId = data.staffId;
            await UpdateAsync(inquiry);

            return true;
        }
    }
}
