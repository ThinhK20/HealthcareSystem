using AutoMapper;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories.AccountRepository;
using HealthcareSystem.Backend.Repositories.InsuranceRepository;
using HealthcareSystem.Backend.Services.AccountService;
using HealthcareSystem.Backend.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace HealthcareSystem.Backend.Controllers
{
    public class CustomerInquiryController : Controller
    {
        private readonly ICustomerInquiryRepository _customerInquiryRepository;


        public CustomerInquiryController(ICustomerInquiryRepository customerInquiry)
        {
            _customerInquiryRepository = customerInquiry;
          
     
        }


        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CustomerInquiryDTO model)
        {
            var inquiry = await _customerInquiryRepository.CreateInquiry(model);
            if (inquiry == null)
            {
                return BadRequest();
            }

            return Ok(inquiry);
        }

    }
}
