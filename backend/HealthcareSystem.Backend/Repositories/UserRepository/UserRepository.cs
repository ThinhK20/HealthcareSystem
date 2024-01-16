using AutoMapper;
using Azure.Core;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Enums;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;
using HealthcareSystem.Backend.Repositories.Token;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace HealthcareSystem.Backend.Repositories
{
    public class UserRepository : Repository<Models.Entity.User>, IUserRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationContext;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ITokenRepository _tokenRepository;

        public UserRepository(ApplicationDbContext context, IMapper mapper, UserManager<IdentityUser> userManager, ITokenRepository tokenRepository) : base(context)
        {
            _mapper = mapper;
            _applicationContext = context;
            _userManager = userManager;
            _tokenRepository = tokenRepository;
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

        public async Task<UserGoogleDTO> checkEmailByGoogle(UserDTO data)
        {
            Models.Entity.User userNew = _mapper.Map<Models.Entity.User>(data);
            var users = await GetAllAsync();
            bool emailExists = users.Any(user => user.Email == data.Email);
            if (emailExists)
            {
                var user = users.Find(x => x.Email == data.Email);
                
                Models.Domain.UserDomain userDomain = _mapper.Map<Models.Domain.UserDomain>(user);
                var userIdentity = await _userManager.FindByEmailAsync(data.Email);
                if (userIdentity.UserName.StartsWith("user_") == false)
                {
                    throw new Exception("Email has been registered by the normal registration method");
                }
                var roles = await _userManager.GetRolesAsync(userIdentity);
                var jwtToken = _tokenRepository.CreateJWTToken(userIdentity, roles.ToList());
                var respone = new UserGoogleDTO
                {
                    Status = "Exist",
                    token = jwtToken,
                    user = userDomain
                };
                return respone;
                //return new UserDTO { Email = "Exist" };
            }

            await CreateAsync(userNew);

            return new UserGoogleDTO { Status = "Created" };
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
        public async Task<UserDTO> GetUserByEmail(string email)
        {
            var UserInfo = await GetAsync(x => x.Email == email);
            if (UserInfo == null) return null;
            return _mapper.Map<UserDTO>(UserInfo);
        }

        public async Task<bool> CheckEmailExist(string email)
        {
            var user = await GetAsync(u => u.Email == email);
            if (user == null)
            {
                return false;
            }
            return true;
        }
    }
}
