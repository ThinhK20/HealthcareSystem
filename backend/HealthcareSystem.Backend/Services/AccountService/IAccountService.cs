﻿using HealthcareSystem.Backend.Models.DTO;

namespace HealthcareSystem.Backend.Services.AccountService
{
    public interface IAccountService
    {
        public Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO);
        public  Task<LoginResponseDTO> createAccountForGoogleLogin(RegisterRequestDTO loginRequestDTO);
        public Task<List<Models.Domain.Account>> GetAccountsByPage(int pageSize, int pageNumber);

        public Task<AccountDTO> Register(RegisterRequestDTO registerationRequestDTO);
        public Task<bool> Verification(int data);
        public Task<AccountBaseDTO> CreateAccountStaff(AccountBaseDTO acc,string email);
        public Task<AccountBaseDTO> UpdateAccountStaff(AccountBaseDTO acc);
        public Task<List<AccountGetDTO>> GetAllAccount();
        public Task<AccountBaseDTO> GetAccountByID(int id);
        public Task<AccountBaseDTO> updatePassword(PasswordDTO acc);
        public Task<bool> DeleteAccount(int accountId);

        public Task<int> getAccountIdByUserID(int userid);

        public Task<LoginResponseDTO> loginByGoogle(string email);

        public Task<object> getInsuranceDetailsByAccountId(int accountId);
    }
}
