using HealthcareSystem.Backend.Data;
using System.Linq.Expressions;

namespace HealthcareSystem.Backend.Repositories.GenericRepository
{
    public interface IRepository<T> where T : class
    {
        public Task<List<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null, bool tracked = true, string? includeProperites = null, int pageSize = 3, int pageNumber = 1);

        public Task<T> GetAsync(Expression<Func<T, bool>> filter = null!, bool tracked = true,
            string? includeProperties = null);

        public Task CreateAsync(T entity);
        public Task UpdateAsync(T entity);
        public Task RemoveAsync(T entity);
        public Task SaveAsync();
        public ApplicationDbContext UnitOfWork();
        Task<int> GetLength();

    }
}
