using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.AccountRepository
{
    public interface IAccountRepository : IRepository<Models.Entity.Account>
    {
        public Task<List<Models.Domain.Account>> GetUser();
        public Task<List<AccountGetDTO>> GetAllAccount();
        public Task<AccountBaseDTO> GetAccountByID(int id);
        public Task<bool> checkUserExist(string Username);
        public Task<AccountBaseDTO> updatePassword(PasswordDTO acc);
        public Task<int> getLength();

        public Task<AccountBaseDTO> CreateAccountStaff(AccountBaseDTO acc,string email);
        public Task<AccountBaseDTO> UpdateAccountStaff(AccountBaseDTO acc);

        public Task<bool> UpdateStatus(int userid);
        public Task<bool> DeleteAccount(int accountId);

        public Task<int> getAccountIdByUserID(int userid);

    }
}
