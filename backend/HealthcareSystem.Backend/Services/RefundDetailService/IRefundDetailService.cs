using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;

namespace HealthcareSystem.Backend.Services.RefundDetailService;

public interface IRefundDetailService
{
    public Task<RefundDetailDomain> CreateRefundDetailAsync(CreateRefundDetailDTO refundDetailDTO);
    public Task<List<RefundDetailDomain>> GetAllRefundDetailsAsync();
    public Task<RefundDetailDomain> GetRefundDetailAsync(int refundDetailId);
    public Task<List<RefundDetailDomain>> GetAllRefundDetailsByRefundRequestIdAsync(int refundId);

}