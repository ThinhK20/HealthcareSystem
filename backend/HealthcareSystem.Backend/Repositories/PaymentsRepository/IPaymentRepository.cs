﻿using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;


namespace HealthcareSystem.Backend.Repositories
{
    public interface IPaymentRepository : IRepository<Models.Entity.Payment>
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