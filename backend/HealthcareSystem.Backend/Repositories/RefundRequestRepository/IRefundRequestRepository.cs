using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.RefundRequestRepository
{
    public interface IRefundRequestRepository : IRepository<RefundRequest>
    {
        public Task<RefundRequestDTO> CreateRefundRequestAsync(RefundRequestDTO refundRequestDTO);
        public Task<List<RefundRequestDomain>> GetAllRefundRequestsAsync();
        public Task<RefundRequestDomain> GetRefundRequestByIdAsync(int refundId);
        public Task<List<RefundRequestDomain>> GetRefundRequestByAccountIdAsync(int accountId);
        public Task<bool> UpdateRefundRequestAsync(RefundRequestDomain refundRequestDomain);
        public Task<bool> AcceptRefundRequestByIdAsync(int refundId);
        public Task<bool> RejectRefundRequestByIdAsync(int refundId);
        public Task<bool> PendingRefundRequestByIdAsync(int refundId);
    }
}
