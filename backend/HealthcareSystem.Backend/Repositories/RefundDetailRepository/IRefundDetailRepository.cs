using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.RefundDetailRepository;

public interface IRefundDetailRepository  : IRepository<Models.Entity.RefundDetail>
{
    public Task<RefundDetailDomain> CreateRefundDetailAsync(RefundDetailDomain refundDetailDomain);
    public Task<List<RefundDetailDomain>> GetAllRefundDetailsAsync();
    public Task<RefundDetailDomain> GetRefundDetailAsync(int refundDetailId);
    public Task<List<RefundDetailDomain>> GetAllRefundDetailsByRefundRequestIdAsync(int refundId);

}