using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;

namespace HealthcareSystem.Backend.Services.RefundRequestService
{
    public interface IRefundRequestService
    {
        public Task<RefundRequestDTO> CreateRefundRequestAsync(RefundRequestDTO refundRequestDTO);
        public Task<List<RefundRequestDomain>> GetAllRefundRequestsAsync();
        public Task<RefundRequestDomain> GetRefundRequestByIdAsync(int refundId);
        public Task<bool> AcceptRefundRequestByIdAsync(int refundId);
        public Task<bool> UpdateRefundRequestAsync(RefundRequestDomain refundRequestDomain);
        public Task<List<RefundRequestDomain>> GetRefundRequestByAccountIdAsync(int accountId);
        public Task<bool> RejectRefundRequestByIdAsync(int refundId);
        public Task<bool> PendingRefundRequestByIdAsync(int refundId);
    }
}
