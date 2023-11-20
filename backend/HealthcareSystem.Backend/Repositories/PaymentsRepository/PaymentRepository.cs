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

        public async Task<bool> CreatePayment(PaymentCreateDTO payment)
        {
            if (payment == null) throw new Exception("Customer request not found.");
            Payment pay = new Payment
            {
                RequestId = payment.RequestId,
                CreatedDate = DateTime.UtcNow,
                Status = false,
                Price = payment.Price,
            };
            Models.Entity.Payment entity = _mapper.Map<Models.Entity.Payment>(pay);
            await CreateAsync(entity);
            return true;
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

        public async Task<List<Payment>> GetAllPaymentRequestsAsync()
        {
            var query = await GetAllAsync();
            var paymentQuery =  query.Select(u => _mapper.Map<Payment>(u)).ToList();
            return paymentQuery;
        }
        public async Task<List<Payment>> GetPendingTransferPaymentRequestsAsync()
        {
            var payments = await GetAsync(x => x.Status == false);
            return _mapper.Map<List<Payment>>(new List<Payment> { payments });
        }

        public async Task<List<Payment>> GetPaymentedAsync()
        {
            var payments = await GetAsync(x => x.Status == true);
            return _mapper.Map<List<Payment>>(new List<Payment> { payments });
        }
        public async Task<Payment> GetPaymentIdAsync(int PaymentId)
        {
            return _mapper.Map<Payment>(await GetAsync(x => x.PaymentId == PaymentId));
        }
    }
}
