using AutoMapper;
using Azure.Core;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;
using System.Collections.Generic;

namespace HealthcareSystem.Backend.Repositories
{
    public class UserRepository : Repository<Models.Entity.User>, IUserRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationContext;

        public UserRepository(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _applicationContext = context;
        }

        public async Task<UserPriceDomain> GetUserInfoForPriceByIdAsync(int UserID)
        {
            var UserInfo = await GetAsync(x => x.UserId == UserID);
            if (UserInfo == null) throw new Exception("User not found.");
            return _mapper.Map<UserPriceDomain>(UserInfo);
        }

        public async Task<UserDomain> GetUserByAccount(int AccountId)
        {
            var UserInfo = await GetAsync(x => x.Account.AccountId == AccountId);
            if (UserInfo == null) return null;
            return _mapper.Map<UserDomain>(UserInfo);
        }

        public async Task<UserDTO> CreateUser(UserDTO user)
        {
            Models.Entity.User userNew = _mapper.Map<Models.Entity.User>(user); ;
            await CreateAsync(userNew);
            var UserCreated = await GetAsync(x =>x.CCCD ==  user.CCCD);
            return  _mapper.Map<UserDTO>(UserCreated);
        }

        public async Task<UserDTO> CreateUserGoogle(UserDTO data)
        {
            Models.Entity.User userNew = _mapper.Map<Models.Entity.User>(data);
            var users = await GetAllAsync();
            bool emailExists = users.Any(user => user.Email == data.Email && user.Fullname == data.Fullname);
            if (emailExists)
            {
                return new UserDTO { Email = "Exist" };
            }

            await CreateAsync(userNew);
            return data;
        }

        public async Task<UserDTO> UpdateUser(UserDTO user)
        {
            try
            {
                Models.Entity.User userNew = _mapper.Map<Models.Entity.User>(user); ;
                await UpdateAsync(userNew);
                return user;
            }
        catch 
            {
                throw new Exception("dont find user");
            }
          
        }
        public async Task<List<UserDTO>> GetAllUsers()
        {
            var users = await GetAllAsync();
            return _mapper.Map<List<UserDTO>>(users);
        }
    }
}
