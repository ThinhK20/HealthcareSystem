using HealthcareSystem.Backend.Models.DTO;

namespace HealthcareSystem.Backend.Services.RefundRequestService
{
    public interface IRefundRequestService
    {
        public Task<RefundRequestDTO> CreateRefundRequestAsync(RefundRequestDTO refundRequestDTO);
    }
}
