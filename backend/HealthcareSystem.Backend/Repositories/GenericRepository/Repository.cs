using HealthcareSystem.Backend.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using HealthcareSystem.Backend.Enums;

namespace HealthcareSystem.Backend.Repositories.GenericRepository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<T> _dbSet;

        protected Repository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task<List<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null, bool tracked = true, string? includeProperites = null, int pageSize = Int32.MaxValue, int pageNumber = 1)
        {
            IQueryable<T> query = _dbSet;
            if (filter != null) query = query.Where(filter);
            if (!tracked) query = query.AsNoTracking();
            
            if (includeProperites != null)
                foreach (var includeProp in includeProperites.Split(new[] { ',' },
                             StringSplitOptions.RemoveEmptyEntries))
                    query = query.Include(includeProp);
            if (pageSize > 0)
            {
                query = query.Skip(pageSize * (pageNumber - 1)).Take(pageSize);
            }
            return await query.ToListAsync();
        }



        public async Task<T> GetAsync(Expression<Func<T, bool>>? filter = null, bool tracked = true,
            string? includeProperties = null)
        {
            IQueryable<T> query = _dbSet;
            if (!tracked) query = query.AsNoTracking();

            if (includeProperties != null)
                foreach (var includeProp in includeProperties.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                    query = query.Include(includeProp);

            if (filter != null) query = query.Where(filter);

         
            return (await query.FirstOrDefaultAsync())!;
        }

        public async Task CreateAsync(T entity)
        {
            await _context.AddAsync(entity);
            await SaveAsync();
        }

        public async Task AddRangeAsync(List<T> entities)
        {
            await _context.AddRangeAsync(entities);
            await SaveAsync();
        }

        public async Task RemoveAsync(T entity)
        {
            _context.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public ApplicationDbContext UnitOfWork()
        {
            return _context;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            _context.Update(entity);
            await _context.SaveChangesAsync();
        }
        public async Task<int> GetLength()
        {
            return _dbSet.Count();
        }
    }
}
