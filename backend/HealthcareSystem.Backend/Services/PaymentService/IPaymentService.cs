 
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using Microsoft.Identity.Client;

namespace HealthcareSystem.Backend.Services.PaymentService
{
    public interface IPaymentService
    {
        Task<bool> CreatePayment(PaymentCreateDTO payment);
        Task<bool> DeletePaymentByIdAsync(int PaymentID);
        Task<bool> UpdateStatus(int PaymentID);
        Task<List<PaymentDomain>> GetAllPaymentRequestsAsync();
        Task<List<PaymentDomain>> GetPaymentByRequestID(int requestID);
        Task<List<PaymentDomain>> GetPaymentedAsync();
        Task<PaymentDomain> GetPaymentIdAsync(int PaymentId);
        Task<string> GetCheckOutLink(CheckPayPalInfoDTO info);
        Task<List<PaymentOfUserDTO>> GetPaymentByUserID(int AccountID);
        Task<bool> ConfirmPayment(string token, string PayerID);
    }
}
