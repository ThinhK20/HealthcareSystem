using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;
using HealthcareSystem.Backend.Repositories.ImageRepository;
using Microsoft.EntityFrameworkCore;

namespace HealthcareSystem.Backend.Repositories.RefundRequestRepository
{
    public class RefundRequestRepository : Repository<RefundRequest>, IRefundRequestRepository
    {
        private readonly IMapper _mapper;
        private readonly IFileRepository _fileRepository;
        public RefundRequestRepository(ApplicationDbContext context, IMapper mapper, IFileRepository fileRepository) : base(context)
        {
            _mapper = mapper;
            _fileRepository = fileRepository;
        }

        public async Task<RefundRequestDTO> CreateRefundRequestAsync(RefundRequestDTO refundRequestDTO)
        {
            if (refundRequestDTO == null) throw new ArgumentNullException(nameof(refundRequestDTO));
            var existedInsurance = await UnitOfWork().Insurances.FirstOrDefaultAsync(x => x.InsuranceID == refundRequestDTO.InsureId);
            if (existedInsurance is null) throw new UnauthorizedAccessException("User doesn't register the insurance before.");
            var existedInsuranceDetails =
                await UnitOfWork().InsuranceDetails.FirstOrDefaultAsync(x => x.InsureID == existedInsurance.InsuranceID
                && x.DateStart <= DateTime.Now && x.DateEnd >= DateTime.Now);
            if (existedInsuranceDetails is null) throw new UnauthorizedAccessException("Your insurance has been expired. Please register the new one.");
            var entityRefundRequest = _mapper.Map<RefundRequest>(refundRequestDTO);
            string fileUrl = await _fileRepository.UploadFileAsync(new FileUploadDTO { File = refundRequestDTO.File });
            entityRefundRequest.FileUrl = fileUrl;
            await CreateAsync(entityRefundRequest);
            return refundRequestDTO;
        }
    }
}
