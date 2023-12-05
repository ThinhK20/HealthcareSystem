using HealthcareSystem.Backend.Models.DTO;

namespace HealthcareSystem.Backend.Services.AccountService
{
    public interface IAccountService
    {
        public Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO);

    }
}
