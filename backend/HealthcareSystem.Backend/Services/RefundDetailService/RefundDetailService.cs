using AutoMapper;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories;
using HealthcareSystem.Backend.Repositories.InsuranceDetailRepository;
using HealthcareSystem.Backend.Repositories.InsuranceRepository;
using HealthcareSystem.Backend.Repositories.PolicyPackageRepository;
using HealthcareSystem.Backend.Repositories.RefundDetailRepository;
using HealthcareSystem.Backend.Repositories.RefundRequestRepository;

namespace HealthcareSystem.Backend.Services.RefundDetailService;

public class RefundDetailService : IRefundDetailService
{
    private readonly IRefundDetailRepository _refundDetailRepository;
    private readonly IRefundRequestRepository _refundRequestRepository;
    private readonly IPackageDetailRepository _packageDetailRepository;
    private readonly IInsuranceRepository _insuranceRepository;
    private readonly IInsuranceDetailRepository _insuranceDetailRepository;
    
    private readonly IMapper _mapper;
    
    public RefundDetailService(IRefundDetailRepository refundDetailRepository, IRefundRequestRepository refundRequestRepository, IPackageDetailRepository packageDetailRepository, IMapper mapper, IInsuranceRepository insuranceRepository, IInsuranceDetailRepository insuranceDetailRepository, IPolicyPackageRepository policyPackageRepository, IInsurancePolicyRepository insurancePolicyRepository)
    {
        _refundDetailRepository = refundDetailRepository;
        _refundRequestRepository = refundRequestRepository;
        _packageDetailRepository = packageDetailRepository;
        _mapper = mapper;
        _insuranceRepository = insuranceRepository;
        _insuranceDetailRepository = insuranceDetailRepository;
    }

    public async Task<RefundDetailDomain> CreateRefundDetailAsync(CreateRefundDetailDTO refundDetailDTO)
    {
        var refundRequest = await _refundRequestRepository.GetRefundRequestByIdAsync(refundDetailDTO.RefundID);
        if (refundRequest == null) throw new Exception("Refund request invalid.");
        
        var insurance = await _insuranceRepository.GetInsuranceByIdAsync((int)refundRequest.InsureId);
        if (insurance == null) throw new Exception("Refund request invalid.");

        var insuranceDetail = await _insuranceDetailRepository.GetAsync(x => x.InsureID == insurance.InsuranceID && x.DateStart <= DateTime.Now && x.DateEnd >= DateTime.Now);
        if (insuranceDetail == null) throw new Exception("Refund request invalid.");

        var packageDetail = await _packageDetailRepository.GetAsync(x =>
            x.PackageID == insuranceDetail.PackageID && x.PolicyID == refundDetailDTO.PolicyId);

        double refundFee = 0;
        
        if (packageDetail.MaxRefundPerExamination == -1)
        {
            refundFee = (double)refundDetailDTO.PaidFee * (double)packageDetail.PayoutPrice;
        } else if (refundDetailDTO.PaidFee >= packageDetail.MaxRefundPerExamination)
        {
            refundFee = (double)packageDetail.MaxRefundPerExamination * (double)packageDetail.PayoutPrice;
        }
        else
        {
            refundFee = refundDetailDTO.PaidFee * (double)packageDetail.PayoutPrice;
        }

        RefundDetailDomain refundDetailDomain = _mapper.Map<RefundDetailDomain>(refundDetailDTO);
        refundDetailDomain.RefundFee = refundFee;
        return await _refundDetailRepository.CreateRefundDetailAsync(refundDetailDomain);
    }

    public async  Task<List<RefundDetailDomain>> GetAllRefundDetailsAsync()
    {
        return await _refundDetailRepository.GetAllRefundDetailsAsync();
    }

    public async  Task<RefundDetailDomain> GetRefundDetailAsync(int refundDetailId)
    {
        return await _refundDetailRepository.GetRefundDetailAsync(refundDetailId);
    }

    public async Task<List<RefundDetailDomain>> GetAllRefundDetailsByRefundRequestIdAsync(int refundId)
    {
        return await _refundDetailRepository.GetAllRefundDetailsByRefundRequestIdAsync(refundId);
    }
}