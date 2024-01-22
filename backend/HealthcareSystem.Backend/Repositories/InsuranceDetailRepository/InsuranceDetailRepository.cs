using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Enums;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;

namespace HealthcareSystem.Backend.Repositories.InsuranceDetailRepository
{
    public class InsuranceDetailRepository : Repository<InsuranceDetail>, IInsuranceDetailRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationContext;
      
        public InsuranceDetailRepository(ApplicationDbContext context,IMapper mapper) : base(context)
        {
            _applicationContext = context;
            _mapper = mapper;
        }

        public async Task<InsuranceDetail> AddInsuranceDatail(InsuranceDetailDomain insuranceDetail)
        {
            if (insuranceDetail == null) throw new Exception("Data is null");
            var getID = await GetAsync(x => x.InsureID == insuranceDetail.InsureID & x.PackageID == insuranceDetail.PackageID);
            if (getID==null)
            {
                Models.Entity.InsuranceDetail entity = _mapper.Map<Models.Entity.InsuranceDetail>(insuranceDetail);
                await CreateAsync(entity);
                return entity;
            }
            else
            {
                //getID.DateStart = DateTime.Now.AddDays((getID.DateEnd - getID.DateStart).TotalDays);
                //getID.DateEnd= DateTime.Now.AddYears(1);
                getID.Status = "Pending extension";
                await UpdateAsync(getID);
                return getID ;
            }
           
        }

        public async Task<InsuranceDetailDomain> GetBy2IdAsync(int insuraceID, int packageID)
        {
            if (insuraceID == null || packageID == null) throw new Exception("Data is null");
            var data = await GetAsync(x => x.InsureID == insuraceID && x.PackageID == packageID);
            var result = _mapper.Map<InsuranceDetailDomain>(data);
            return result;
        }

        public async Task<List<InsuranceDetailDomain>> GetByIdAsync(int insuraceID)
        {
            if(insuraceID ==null) throw new Exception("Data is null");
            var data =  await GetAllAsync(x=>x.InsureID == insuraceID);
            var result = _mapper.Map<List<InsuranceDetailDomain>>(data);
            return result;
        }
        public async Task<List<InsuranceDetailDomainWithoutFKInsurance>> GetDetailByIdAsync(int insuraceID)
        {
            if (insuraceID == null) throw new Exception("Data is null");
            var data = await GetAllAsync(x => x.InsureID == insuraceID, true, "PolicyPackage");
            var result = _mapper.Map<List<InsuranceDetailDomainWithoutFKInsurance>>(data);
            return result;
        }

        public async Task<bool> UpdateStatusBy2Id(int insuraceID, int packageID, string periodic, string status)
        {
            if (insuraceID == null || packageID == null) throw new Exception("Data is null");
            var data = await GetAsync(x => x.InsureID == insuraceID && x.PackageID == packageID);
            if (periodic == Periodic.Quarter)
            {
                data.DateEnd = data.DateEnd.ToString("yyyy-MM-dd") != "0001-01-01" ? data.DateEnd.AddMonths(3) : data.DateStart.AddMonths(3);
                data.Status = status;
                await UpdateAsync(data);
                return true;
            }
            if (periodic == Periodic.HalfYear)
            {
                data.DateEnd = data.DateEnd.ToString("yyyy-MM-dd") != "0001-01-01" ? data.DateEnd.AddMonths(6) : data.DateStart.AddMonths(6);
                data.Status = status;
                await UpdateAsync(data);
                return true;
            }
            if (periodic == Periodic.Year)
            {
                data.DateEnd = data.DateEnd.ToString("yyyy-MM-dd") != "0001-01-01" ? data.DateEnd.AddMonths(12) : data.DateStart.AddMonths(12);
                data.Status = status;
                await UpdateAsync(data);
                return true;
            }
            return false;
        }
    }
}

