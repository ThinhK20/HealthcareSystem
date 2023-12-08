using HealthcareSystem.Backend.Models.DTO;

namespace HealthcareSystem.Backend.Services.AccountService
{
    public interface IAccountService
    {
        public Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO);

        public Task<AccountDTO> Register(RegisterRequestDTO registerationRequestDTO);
<<<<<<< HEAD
        public async Task<AccountDTO> Verification(AccountDTO data);
=======
        public Task<AccountBaseDTO> CreateAccountStaff(AccountBaseDTO acc);
        public Task<AccountBaseDTO> UpdateAccountStaff(AccountBaseDTO acc);
        public Task<AccountBaseDTO> GetAccountByID(int id);
>>>>>>> ce126b1db1c5c86c29b082c763ddeee251244df6
    }
}
