using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.AccountRepository
{
    public interface IAccountRepository :  IRepository<Models.Entity.Account>
    {
        public Task<List<Models.Domain.Account>> GetUser();
        public Task<AccountBaseDTO> GetAccountByID(int id);
        public Task<bool> checkUserExist(string Username);

        public Task<int> getLength();
        public  Task<AccountBaseDTO> CreateAccountStaff(AccountBaseDTO acc);
        public Task<AccountBaseDTO> UpdateAccountStaff(AccountBaseDTO acc);
    }
}
