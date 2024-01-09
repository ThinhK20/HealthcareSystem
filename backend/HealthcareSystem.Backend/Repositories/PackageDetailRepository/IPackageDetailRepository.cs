using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;


namespace HealthcareSystem.Backend.Repositories
{
    public interface IPackageDetailRepository : IRepository<Models.Entity.PackageDetail>
    {
        Task<bool> CreatePackageDetail(PackageDetailCreateDTO packageDetail, int pakaceID);
        Task<bool> UpdateStatus(int PaymentID);
        Task<PackageDetail> GetByIdAsync(int Packageid, int PolicyId);
    }
}