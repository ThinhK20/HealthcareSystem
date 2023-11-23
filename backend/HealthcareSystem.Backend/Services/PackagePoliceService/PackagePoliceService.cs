using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories;

namespace HealthcareSystem.Backend.Services.PackagePoliceService
{
    public class PackagePoliceService : IPackagePoliceService
    {
        private readonly IBasicPriceRepository _basicPriceRepository;


        public PackagePoliceService(IBasicPriceRepository basicPriceRepository) { 
            _basicPriceRepository = basicPriceRepository;
        }
        public async Task<BasicPriceDomain> GetBasicPriceOfPackage(int PackageID, int Age, string Gender)
        {
            return await _basicPriceRepository.GetBasicPrice(PackageID, Age, Gender);
        }
    }
}
