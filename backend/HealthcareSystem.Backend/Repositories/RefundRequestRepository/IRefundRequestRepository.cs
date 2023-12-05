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
    }
}
