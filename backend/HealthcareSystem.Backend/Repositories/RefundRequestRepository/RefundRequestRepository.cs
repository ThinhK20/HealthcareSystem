﻿using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Enums;
using HealthcareSystem.Backend.Models.Domain;
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


        public async Task<bool> UpdateRefundRequestAsync(RefundRequestDTO refundRequestDTO)
        {
            var refundRequest = await GetAsync(rq => rq.RefundID == refundRequestDTO.RefundID, false);
            if (refundRequest is null) throw new Exception("Not found this refund request. Please try again.");
            string fileUrl = await _fileRepository.UploadFileAsync(new FileUploadDTO { File = refundRequestDTO.File });
            var entityRefundRequest = _mapper.Map<RefundRequest>(refundRequestDTO);
            entityRefundRequest.FileUrl = fileUrl;
            await UpdateAsync(entityRefundRequest);
            return true;
        }

        public async Task<RefundRequestDomain> GetRefundRequestByIdAsync(int refundId)
        {
            var refundRequest = await GetAsync(rq => rq.RefundID == refundId, false, "Insurance,Insurance.Account");
            return _mapper.Map<RefundRequestDomain>(refundRequest);
        }

        public async Task<List<RefundRequestDomain>> GetAllRefundRequestsAsync()
        {
            var entities = await GetAllAsync(tracked: false, includeProperites: "Insurance,Insurance.Account");
            return entities.Select(t => _mapper.Map<RefundRequestDomain>(t)).ToList();
        }

        public async Task<List<RefundRequestDomain>> GetRefundRequestByAccountIdAsync(int accountId)
        {

            var refundRequests = await GetAllAsync(tracked: false, includeProperites: "Insurance,Insurance.Account");
            return refundRequests.Where(rr => rr.Insurance!.AccountId == accountId.ToString()).Select(rr => _mapper.Map<RefundRequestDomain>(rr)).ToList();

        }

        public async Task<bool> AcceptRefundRequestByIdAsync(int refundId)
        {
            var refundRequest = await GetAsync(rq => rq.RefundID == refundId);
            refundRequest.Status = RefundRequestStatus.Approved;
            await UpdateAsync(refundRequest);
            return true;
        }

        public async Task<bool> RejectRefundRequestByIdAsync(int refundId)
        {
            var refundRequest = await GetAsync(rq => rq.RefundID == refundId);
            refundRequest.Status = RefundRequestStatus.Rejected;
            await UpdateAsync(refundRequest);
            return true;
        }

        public async Task<bool> PendingRefundRequestByIdAsync(int refundId)
        {
            var refundRequest = await GetAsync(rq => rq.RefundID == refundId);
            refundRequest.Status = RefundRequestStatus.Pending;
            await UpdateAsync(refundRequest);
            return true;
        }



    }
}
