using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.PackageDetailRepository
{
    public class PackageDetailRepository : Repository<Models.Entity.PackageDetail>, IPackageDetailRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationContext;
        public PackageDetailRepository(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _applicationContext = context;

        }
        public async Task<bool> CreatePackageDetail(PackageDetailCreateDTO packageDetail,int pakaceID)
        {
            try
            {
                if (packageDetail == null) return false;
                var newPackageDetail = new PackageDetail
                {
                    PackageID = pakaceID,
                    PolicyID = packageDetail.PolicyId,
                    PayoutPrice = packageDetail.PayoutPrice,
                    MaxRefundPerDay = packageDetail.MaxRefundPerDay,
                    MaxRefundPerExamination = packageDetail.MaxRefundPerExamination,
                    MaxRefundPeYear = packageDetail.MaxRefundPerYear
                };
                await CreateAsync(newPackageDetail);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Task<bool> UpdateStatus(int PaymentID)
        {
            throw new NotImplementedException();
        }
    }
}
