using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;


namespace HealthcareSystem.Backend.Repositories
{
    public interface IPaymentRepository : IRepository<Models.Entity.Payment>
    {
        Task<bool> CreatePayment(Payment payment);
        Task<bool> UpdateStatus(int PaymentID);
        Task<bool> DeletePaymentByIdAsync(int PaymentID);
        Task<List<PaymentDomain>> GetAllPaymentRequestsAsync();
        Task<List<PaymentDomain>> GetPaymentByRequestID(int requestID);
        Task<List<PaymentDomain>> GetPaymentedAsync();
        Task<PaymentDomain> GetPaymentIdAsync(int PaymentId);
        Task<CheckStatusPayPalReturnDomain> CheckStatusPayPal(CheckPayPalInfoDTO info);
        Task<bool> UpdatePayPalInfo(int PaymentID, DateTime CreatedDate, string idPayPal, string linkCheckOut);
        Task<List<PaymentOfUserDTO>> GetPaymentByUserId(int Account);
        Task<Payment> findPaymentByToken(string token);
        Task<int> UpdatePayPalComplete(string token, DateTime updatedDate);
    }
}
