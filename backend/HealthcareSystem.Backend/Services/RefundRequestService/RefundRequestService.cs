using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories.RefundRequestRepository;

namespace HealthcareSystem.Backend.Services.RefundRequestService
{
    public class RefundRequestService : IRefundRequestService
    {
        private readonly IRefundRequestRepository _refundRequestRepository;

        public RefundRequestService(IRefundRequestRepository refundRequestRepository)
        {
            _refundRequestRepository = refundRequestRepository;
        }



        public async Task<RefundRequestDTO> CreateRefundRequestAsync(RefundRequestDTO refundRequestDTO)
        {
            return await _refundRequestRepository.CreateRefundRequestAsync(refundRequestDTO);
        }

        public async Task<List<RefundRequestDomain>> GetAllRefundRequestsAsync()
        {
            return await _refundRequestRepository.GetAllRefundRequestsAsync();
        }

        public async Task<RefundRequestDomain> GetRefundRequestByIdAsync(int refundId)
        {
            return await _refundRequestRepository.GetRefundRequestByIdAsync(refundId);
        }

        public Task<bool> AcceptRefundRequestByIdAsync(int refundId)
        {
            return _refundRequestRepository.AcceptRefundRequestByIdAsync(refundId);
        }

        public Task<bool> PendingRefundRequestByIdAsync(int refundId)
        {
            return _refundRequestRepository.PendingRefundRequestByIdAsync(refundId);
        }

        public Task<bool> RejectRefundRequestByIdAsync(int refundId)
        {
            return _refundRequestRepository.RejectRefundRequestByIdAsync(refundId);
        }
    }
}
