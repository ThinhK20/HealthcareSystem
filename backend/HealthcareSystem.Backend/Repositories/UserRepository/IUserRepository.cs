using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories
{
    public interface IUserRepository: IRepository<Models.Entity.User>
    {
        public Task<UserPriceDomain> GetUserInfoForPriceByIdAsync(int UserID);
        public Task<UserDomain> GetUserByAccount(int AccountId);
        public Task <UserDTO> CreateUser(UserDTO user);
        public Task<UserDTO> UpdateUser(UserDTO user);

        public Task<List<UserDTO>> GetAllUsers();
        public Task<UserGoogleDTO> checkEmailByGoogle(UserDTO user);
        public Task<bool> CheckEmailExist(string email);

        public Task<UserDTO> GetUserByEmail(string email);

    }
}
