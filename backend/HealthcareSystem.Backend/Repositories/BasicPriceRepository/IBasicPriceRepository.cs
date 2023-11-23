using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories
{
    public interface IBasicPriceRepository: IRepository<Models.Entity.BasicPrice>
    {
        public Task<BasicPriceDomain> GetBasicPrice(int PackageID,int Age, string Gender);
    }
}
