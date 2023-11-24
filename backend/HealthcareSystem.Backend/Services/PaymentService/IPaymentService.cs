 
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;

namespace HealthcareSystem.Backend.Services.PaymentService
{
    public interface IPaymentService
    {
        Task<int> CreatePayment(PaymentCreateDTO payment);
        Task<bool> DeletePaymentByIdAsync(int PaymentID);
        Task<List<PaymentDomain>> GetAllPaymentRequestsAsync();
        Task<List<PaymentDomain>> GetPendingTransferPaymentRequestsAsync();
        Task<List<PaymentDomain>> GetPaymentedAsync();
        Task<PaymentDomain> GetPaymentIdAsync(int PaymentId);
    }
}
