using AutoMapper;
using Azure.Core;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Models.PayPal;
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
            if (payment == null) return false;
            await CreateAsync(payment);
            return true;
        }
        public async Task<bool> UpdateStatus(int PaymentID)
        {
            var query = await GetAsync(t => t.PaymentId == PaymentID);
            if (query == null) throw new Exception("Payment not found");
            query.Status = true;
            query.UpdatedDate = DateTime.Now;
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
            var paymentQuery = query.Select(u => _mapper.Map<PaymentDomain>(u)).ToList();
            return paymentQuery;
        }
        public async Task<List<PaymentDomain>> GetPaymentByRequestID(int requestID)
        {
            var payments = await GetAllAsync(x => x.RequestId == requestID);
            return _mapper.Map<List<PaymentDomain>>(payments);
        }

        public async Task<List<PaymentDomain>> GetPaymentedAsync()
        {
            var payments = await GetAllAsync(x => x.Status == true, true, "CustomerRequest");
            return _mapper.Map<List<PaymentDomain>>(payments);
        }
        public async Task<PaymentDomain> GetPaymentIdAsync(int PaymentId)
        {
            return _mapper.Map<PaymentDomain>(await GetAsync(x => x.PaymentId == PaymentId));
        }

        public async Task<CheckStatusPayPalReturnDomain> CheckStatusPayPal(CheckPayPalInfoDTO info)
        {
            DateTime timeCheck = DateTime.Now;
            PayPalCheckDomain paymentInfo = _mapper.Map<PayPalCheckDomain>(await GetAsync(x => (x.PaymentId == info.PaymentId && x.RequestId == info.RequestId && x.CreatedDate <= timeCheck && x.ExpirationDate >= timeCheck && x.Status == false)));
            if (paymentInfo == null) return new CheckStatusPayPalReturnDomain() { status = "null" };
            else
            {


                if (paymentInfo.ExpirationPaypal == null)
                {
                    return new CheckStatusPayPalReturnDomain() { status = "No Link", Price = paymentInfo.Price };
                }
                else if (paymentInfo.ExpirationPaypal > DateTime.Now)
                {
                    return new CheckStatusPayPalReturnDomain() { status = "Link", LinkCheckOut = paymentInfo.LinkCheckOut };

                }
                else
                {
                    return new CheckStatusPayPalReturnDomain() { status = "Time expired", Price = paymentInfo.Price };

                }

            }
        }
        public async Task<bool> UpdatePayPalInfo(int PaymentID,DateTime CreatedDate,string idPayPal,string linkCheckOut)
        {
            var query = await GetAsync(t => t.PaymentId == PaymentID);
            if (query == null) throw new Exception("Payment not found");
            query.ExpirationPaypal = CreatedDate.AddHours(6);
            query.idPayPal = idPayPal;
            query.LinkCheckOut = linkCheckOut;
            await UpdateAsync(query);
            return true;
        }

        public async Task<List<PaymentOfUserDTO>> GetPaymentByUserId(int AccountId)
        {
            var payments = await GetAllAsync(null, true, "CustomerRequest");
            var listPayment =  _mapper.Map<List<PaymentDomain>>(payments);
            listPayment = listPayment.FindAll(payment => payment.CustomerRequest.AccountId == AccountId);
            var result = _mapper.Map<List<PaymentOfUserDTO>>(listPayment);
            return result;
        }
        public async Task<Payment> findPaymentByToken(string token)
        {
            var query = await GetAsync(x=>x.idPayPal == token);
            return query;
        }

        public async Task<int> UpdatePayPalComplete(string token, DateTime updatedDate)
        {
            var query = await GetAsync(x => x.idPayPal == token);
            if (query == null) throw new Exception("Payment not found");
            query.Status = true;
            query.UpdatedDate = updatedDate;
            await UpdateAsync(query);
            return (int)query.RequestId;
        }

        public async Task<List<Payment>> GetAllPayment(int requestId)
        {
            return await GetAllAsync(x=> x.RequestId == requestId);
        }
    }
}
