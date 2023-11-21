using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories;
using Microsoft.VisualBasic;

namespace HealthcareSystem.Backend.Services.PaymentService
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _services;

        public async Task<bool> CreatePayment(PaymentCreateDTO payment)
        {
            return await _services.CreatePayment(payment);
        }

        public async Task<bool> DeletePaymentByIdAsync(int PaymentID)
        {
            return await _services.DeletePaymentByIdAsync(PaymentID);
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

        public async Task<List<PaymentDomain>> GetPendingTransferPaymentRequestsAsync()
        {
            return await _services.GetPendingTransferPaymentRequestsAsync();
        }

        public Task<bool> UpdateStatus(int PaymentID)
        {
            throw new NotImplementedException();
        }
    }
}
