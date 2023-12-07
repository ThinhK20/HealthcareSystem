using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories;
using HealthcareSystem.Backend.Services.UserService;
using Microsoft.VisualBasic;

namespace HealthcareSystem.Backend.Services.PaymentService
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _services;
        private readonly IUserService _userService;
        public PaymentService(IPaymentRepository services, IUserRepository customerRequestRepository, IUserService userService)
        {
            _services = services;
            _userService = userService;

        }
        public async Task<bool> CreatePayment(PaymentCreateDTO payment)
        {
            if (payment == null) throw new Exception("Payment request not found.");
            var dataRequest = await _userService.GetCustomerRequestByIdAsync(payment.RequestId);
            var month = 0;
            if (dataRequest.Periodic == "quarter ") month = 3;
            if (dataRequest.Periodic == "half year") month = 6;
            if (dataRequest.Periodic == "year") month = 12;
            if (month==0)  throw new Exception("request not activity.");
            for (var i = 0; i < month; i++)
            {
                Payment pay = new Payment
                {
                    RequestId = payment.RequestId,
                    CreatedDate = DateTime.UtcNow.AddMonths(i * month),
                    ExpirationDate = DateTime.UtcNow.AddMonths(i * month).AddDays(7),
                    ExpirationPaypal = null,
                    Status = false,
                    Price = payment.Price * month / 12,
                    UpdatedDate = null,
                    LinkCheckOut = null,
                    PaypalEmail = null,
                };
                await _services.CreatePayment(pay);
            }
            return true;
        }

        public async Task<bool> DeletePaymentByIdAsync(int PaymentID)
        {
            return await _services.DeletePaymentByIdAsync(PaymentID);
        }
        public async Task<bool> UpdateStatus(int PaymentID)
        {
            return await _services.UpdateStatus(PaymentID);
        }
        public async Task<List<PaymentDomain>> GetAllPaymentRequestsAsync()
        {
            return await _services.GetAllPaymentRequestsAsync();
        }

        public async Task<List<PaymentDomain>> GetPaymentedAsync()
        {
            return await _services.GetPaymentedAsync();
        }

        public async Task<PaymentDomain> GetPaymentIdAsync(int PaymentId)
        {
            return await _services.GetPaymentIdAsync(PaymentId);
        }

        public async Task<List<PaymentDomain>> GetPaymentByRequestID(int requestID)
        {
            return await _services.GetPaymentByRequestID(requestID);
        }

    }
}
