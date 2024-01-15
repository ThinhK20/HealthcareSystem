﻿using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.RefundDetailRepository;

public class RefundDetailRepository : Repository<RefundDetail>, IRefundDetailRepository
{
    private readonly IMapper _mapper;
    public RefundDetailRepository(ApplicationDbContext context, IMapper mapper) : base(context)
    {
        _mapper = mapper;
    }

    public async Task<RefundDetailDomain> CreateRefundDetailAsync(RefundDetailDomain refundDetailDomain)
    {
        var existedRefundDetail = await GetAsync(x =>
            x.RefundID == refundDetailDomain.RefundID && x.PolicyId == refundDetailDomain.PolicyId);
        if (existedRefundDetail != null) throw new BadHttpRequestException("Refund detail already existed.");
        await CreateAsync(_mapper.Map<RefundDetail>(refundDetailDomain));
        return refundDetailDomain;
    }

    public async Task<List<RefundDetailDomain>> GetAllRefundDetailsAsync()
    {
        var refundDetails = await GetAllAsync(tracked: false, includeProperites: "InsurancePolicy,RefundRequest");
        return refundDetails.Select(x => _mapper.Map<RefundDetailDomain>(x)).ToList();
    }

    public async Task<RefundDetailDomain> GetRefundDetailAsync(int refundDetailId)
    {
        var refundDetail = await GetAsync(x => x.RefundDetailID == refundDetailId, tracked:false, includeProperties:"InsurancePolicy,RefundRequest");
        return _mapper.Map<RefundDetailDomain>(refundDetail);
    }
    
}