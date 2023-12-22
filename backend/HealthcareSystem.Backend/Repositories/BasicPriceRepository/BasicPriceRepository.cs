using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace HealthcareSystem.Backend.Repositories
{
    public class BasicPriceRepository : Repository<Models.Entity.BasicPrice>, IBasicPriceRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationContext;
        public BasicPriceRepository(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _applicationContext = context;
        }

        public async Task<bool> CreateNew(BasicPriceCreateDTO price, int packageId,int index)
        {
            if (price == null) return false;
            BasicPrice priceCreate = new BasicPrice
            {
                PackageID = packageId,
                IndexId = index + 1,
                FromAge = price.FromAge,
                ToAge = price.ToAge,
                Gender = price.Gender,
                Price = price.Price,
            };
            await CreateAsync(priceCreate);
            return true;
        }

        public async Task<BasicPriceDomain> GetBasicPrice(int PackageID, int Age, string Gender)
        {
            var BasicPrice = await GetAsync(x =>  x.PackageID == PackageID && x.Gender == Gender && x.FromAge <= Age && x.ToAge > Age);
            if (BasicPrice == null) throw new Exception("You are not supported for this package.");
            return _mapper.Map<BasicPriceDomain>(BasicPrice);
        }
    }
}
