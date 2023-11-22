﻿
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;

namespace HealthcareSystem.Backend.Services.PaymentService
{
    public interface IPaymentService
    {
        Task<bool> CreatePayment(PaymentCreateDTO payment);
        Task<bool> UpdateStatus(int PaymentID);
        Task<bool> DeletePaymentByIdAsync(int PaymentID);
        Task<List<PaymentDomain>> GetAllPaymentRequestsAsync();
        Task<List<PaymentDomain>> GetPendingTransferPaymentRequestsAsync();
        Task<List<PaymentDomain>> GetPaymentedAsync();
        Task<PaymentDomain> GetPaymentIdAsync(int PaymentId);
    }
}