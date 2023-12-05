﻿using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.AccountRepository
{
    public interface IAccountRepository :  IRepository<Models.Entity.Account>
    {
        public Task<List<Models.Domain.Account>> GetUser();

        public Task<bool> checkUserExist(string Username);

        public Task<int> getLength();

        

    }
}
