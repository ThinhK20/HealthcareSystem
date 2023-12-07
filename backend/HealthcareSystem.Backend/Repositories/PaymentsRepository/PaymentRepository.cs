using AutoMapper;
using Azure.Core;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

using System;

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

        public async Task<bool> CreatePayment(Payment payment)
        {
             if(payment==null) return false;
                await CreateAsync(payment);
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

        public async Task<List<PaymentDomain>> GetAllPaymentRequestsAsync()
        {
            var query = await GetAllAsync(null, true, "CustomerRequest");
            var paymentQuery =  query.Select(u => _mapper.Map<PaymentDomain>(u)).ToList();
            return paymentQuery;
        }
        public async Task<List<PaymentDomain>> GetPaymentByRequestID(int requestID)
        {
            var payments = await GetAllAsync(x => x.RequestId == requestID);
            return _mapper.Map<List<PaymentDomain>>(payments);
        }

        public async Task<List<PaymentDomain>> GetPaymentedAsync()
        {
            var payments = await GetAllAsync(x => x.Status == true,true, "CustomerRequest");
            return _mapper.Map<List<PaymentDomain>>(payments);
        }
        public async Task<PaymentDomain> GetPaymentIdAsync(int PaymentId)
        {
            return _mapper.Map<PaymentDomain>(await GetAsync(x => x.PaymentId == PaymentId));
        }
    }
}
