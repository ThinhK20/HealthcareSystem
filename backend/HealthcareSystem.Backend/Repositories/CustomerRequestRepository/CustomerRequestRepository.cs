using AutoMapper;
using Azure.Core;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;
using HealthcareSystem.Backend.Services.InsuranceDetalService;
using HealthcareSystem.Backend.Services.PaymentService;

namespace HealthcareSystem.Backend.Repositories
{
    public class CustomerRequestRepository : Repository<Models.Entity.CustomerRequest>, ICustomerRequestRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationContext;
        private readonly IPaymentRepository _paymentService;
        private readonly IInsuranceDetailService _invoiceDetailService;
        public CustomerRequestRepository(ApplicationDbContext context, IMapper mapper, IPaymentRepository paymentService, IInsuranceDetailService insuranceDetailService) : base(context)
        {
            _mapper = mapper;
            _applicationContext = context;
            _paymentService = paymentService;
            _invoiceDetailService = insuranceDetailService;
        }

        public async Task<CustomerRequestCreateDTO> CreateCustomerRequest(CustomerRequestCreateDTO customerRequest)
        {
            if (customerRequest == null) throw new Exception("Customer request not found.");
            Models.Entity.CustomerRequest entity = _mapper.Map<Models.Entity.CustomerRequest>(customerRequest);
            entity.Status = "Pending Confirmation" ;
            await CreateAsync(entity);
            return customerRequest;
        }

        public async Task<bool> DeleteCustomerRequestByIdAsync(int requestId)
        {
            var existedRequest = await GetAsync(x => x.RequestID == requestId);
            if (existedRequest == null) throw new Exception("Customer request not found.");
            await RemoveAsync(existedRequest);
            return true; ;
        }

        public async Task<List<CustomerRequestDomain>> GetAllCustomerRequestsAsync()
        {
            var entityRequests = await GetAllAsync(null, true, "Account,Staff,Payment,PolicyPackage");
            var customerRequests = entityRequests.Select(t => _mapper.Map<CustomerRequestDomain>(t)).ToList();
            return customerRequests;
        }

        public async Task<CustomerRequestDomain> GetCustomerRequestByIdAsync(int requestId)
        {
            return _mapper.Map<CustomerRequestDomain>(await GetAsync(x => x.RequestID == requestId, true, "Account,Staff,Payment,PolicyPackage"));
        }
        public async Task<bool> AcceptCustomerRequest(int Accept)
        {
            var ctm_request =  await GetAsync(x => x.RequestID == Accept);
            if (ctm_request == null) throw new Exception("Request NULL");

 
            ctm_request.Status = "Pending Transfer";
      
            var dataRequest = await GetCustomerRequestByIdAsync(ctm_request.RequestID);
            var month = 0;
            if (dataRequest.Periodic == "quarter") month = 3;
            if (dataRequest.Periodic == "half year") month = 6;
            if (dataRequest.Periodic == "year") month = 12;
            for (var i = 0; i < month; i++)
            {
                Payment pay = new Payment
                {
                    RequestId = ctm_request.RequestID,
                    CreatedDate = DateTime.UtcNow.AddMonths(i * month),
                    ExpirationDate = DateTime.UtcNow.AddMonths(i * month).AddDays(7),
                    ExpirationPaypal = null,
                    Status = false,
                    Price = ctm_request.Price * month / 12,
                    UpdatedDate = null,
                    LinkCheckOut = null,
                    PaypalEmail = null,
                };
                await _paymentService.CreatePayment(pay);
            }
            await UpdateAsync(ctm_request);
            return true;
        }
        public async Task<bool> RefusedCustomerRequest(int id)
        {
            var ctm_request = await GetAsync(x => x.RequestID == id);
            if (ctm_request == null) throw new Exception("Not Found Request ID");
            ctm_request.Status = "Refused";
            await UpdateAsync(ctm_request);
            return true;

        }
        public async Task<bool> CompleteCustomerRequest(int id)
        {
            var ctm_request = await GetAsync(x => x.RequestID == id);
            if (ctm_request == null) throw new Exception("Not Found Request ID");
            //await _paymentService.UpdateStatus((int)ctm_request.PackageId);
            ctm_request.Status = "Completed";
            await UpdateAsync(ctm_request);
            InsuranceDetailDomain Insuran_form = new InsuranceDetailDomain
            {
                InsureID = 1,
                PackageID = ctm_request.PackageId,
                DateStart = DateTime.Now,
                DateEnd = DateTime.Now.AddYears(1),
            };
           await _invoiceDetailService.AddInsuranceDatail(Insuran_form);
            return true;
        }
    }
}
