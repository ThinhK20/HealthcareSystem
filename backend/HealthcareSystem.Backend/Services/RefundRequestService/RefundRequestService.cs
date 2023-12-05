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
    }
}
