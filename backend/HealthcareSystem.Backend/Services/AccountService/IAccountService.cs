using HealthcareSystem.Backend.Models.DTO;

namespace HealthcareSystem.Backend.Services.AccountService
{
    public interface IAccountService
    {
        public Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO);

        public Task<AccountDTO> Register(RegisterRequestDTO registerationRequestDTO);
        public Task<AccountBaseDTO> CreateAccountStaff(AccountBaseDTO acc);
        public Task<AccountBaseDTO> UpdateAccountStaff(AccountBaseDTO acc);
        public Task<AccountBaseDTO> GetAccountByID(int id);
    }
}
