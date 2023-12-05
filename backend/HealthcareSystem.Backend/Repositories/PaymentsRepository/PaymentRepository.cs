using AutoMapper;
using Azure.Core;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories
{
    public class PaymentRepository : Repository<Models.Entity.Payment>, IPaymentRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationContext;
        public PaymentRepository(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _applicationContext = context;  
        }

        public async Task<int> CreatePayment(PaymentCreateDTO payment)
        {
            if (payment == null) throw new Exception("Customer request not found.");
            Payment pay = new Payment
            {
                RequestId = payment.RequestId,
                CreatedDate = DateTime.UtcNow,
                ExpirationDate = DateTime.UtcNow.AddDays(7),
                ExpirationPaypal = null,
                Status = false,
                Price = payment.Price,
                UpdatedDate = DateTime.UtcNow,
                LinkCheckOut = null,
                PaypalEmail = null,
            };
            Models.Entity.Payment entity = _mapper.Map<Models.Entity.Payment>(pay);
            await CreateAsync(entity);
            var request = await GetAsync(filter => filter.RequestId == payment.RequestId && pay.CreatedDate== filter.CreatedDate);
            return request.PaymentId;
        }
        public async Task<bool> UpdateStatus(int PaymentID)
        {
            var query = await GetAsync(t => t.PaymentId == PaymentID);
            if (query == null) throw new Exception("Payment not found");
            query.Status = true;
            query.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(query);
            return true;
        }
        public async Task<bool> DeletePaymentByIdAsync(int PaymentID)
        {
            var existedRequest = await GetAsync(x => x.PaymentId == PaymentID);
            if (existedRequest == null) throw new Exception("Payment not found.");
            await RemoveAsync(existedRequest);
            return true; ;
        }

        public async Task<List<PaymentDomain>> GetAllPaymentRequestsAsync()
        {
            var query = await GetAllAsync();
            var paymentQuery =  query.Select(u => _mapper.Map<PaymentDomain>(u)).ToList();
            return paymentQuery;
        }
        public async Task<List<PaymentDomain>> GetPendingTransferPaymentRequestsAsync()
        {
            var payments = await GetAllAsync(x => x.Status == false);
            return _mapper.Map<List<PaymentDomain>>(payments);
        }

        public async Task<List<PaymentDomain>> GetPaymentedAsync()
        {
            var payments = await GetAllAsync(x => x.Status == true);
            return _mapper.Map<List<PaymentDomain>>(payments);
        }
        public async Task<PaymentDomain> GetPaymentIdAsync(int PaymentId)
        {
            return _mapper.Map<PaymentDomain>(await GetAsync(x => x.PaymentId == PaymentId));
        }
    }
}
