﻿using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;

namespace HealthcareSystem.Backend.Services.UserService
{
    public interface IUserService
    {
        public Task<CustomerRequestCreateDTO> CreateCustomerRequestAsync(CustomerRequestCreateDTO customerRequest);
        public Task<bool> DeleteCustomerRequestByIdAsync(int requestId);
        public Task<List<CustomerRequestDomain>> GetAllCustomerRequestsAsync();
        public Task<CustomerRequestDomain> GetCustomerRequestByIdAsync(int requestId);
        public Task<UserPriceDomain> GetUserInfoForPriceByIdAsync(int UserID);
        public Task<double> GetFeesIncrease(int UserID);
        public Task<bool> AcceptCustomerRequest(int Accept, int StaffId);
        public Task<bool> RefusedCustomerRequest(int id, int staffId);
        public Task<bool> CompleteCustomerRequest(int id);
        public Task<UserDTO> CreateUser(UserDTO user);
        public Task<UserDTO> UpdateUser(UserDTO user);
        public Task<UserDomain> GetUserByAccount(int AccountId);

        public Task<UserGoogleDTO> checkEmailByGoogleLogin(UserDTO user);
        public Task<List<UserDTO>> GetAllUsers();


        public Task<UserDTO> GetUserByEmail(string email);

        public Task<double> GetPriceForUser(int accountId, int packageId, string periodic);

        public Task<List<HealthRecordDomain>> GetHealthRecords(int userId);

        public Task<bool> addnewHr(List<HealthRecordDTO> data);

        public Task<List<FeeAffectDomain>> getAllFeeAffect();
    }
}
