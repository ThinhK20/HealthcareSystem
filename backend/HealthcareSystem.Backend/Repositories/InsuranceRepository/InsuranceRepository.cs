using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;
using Microsoft.Identity.Client;

namespace HealthcareSystem.Backend.Repositories.InsuranceRepository
{
    public class InsuranceRepository : Repository<Insurance>, IInsuranceRepository
    {
        private readonly IMapper _mapper;
        public InsuranceRepository(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
        }

        public async Task<List<InsuranceDomain>> GetAllInsurancesAsync()
        {
            var insurances = await GetAllAsync(includeProperites: "Account,InsuranceDetails", tracked: false);
            return insurances.Select(t => _mapper.Map<InsuranceDomain>(t)).ToList();
        }

        public async Task<InsuranceDomain> GetInsuranceByIdAsync(int insuranceId)
        {
            return _mapper.Map<InsuranceDomain>(await GetAsync(t => t.InsuranceID == insuranceId, false, "Account,InsuranceDetails"));
        }

        public async Task<InsuranceDomain> Delete(int insuranceId)
        {
                if (insuranceId == null || insuranceId == 0)
                {
                    return new InsuranceDomain
                    {
                        RegisterPlace = "Id not valid"
                    };
                }
                var findInsurance = await GetAsync(u => u.InsuranceID == insuranceId);
                if (findInsurance == null)
                {
                    return new InsuranceDomain
                    {
                        RegisterPlace = "Insurance not exist"
                    };
                }

                await RemoveAsync(findInsurance);

                return _mapper.Map<InsuranceDomain>(findInsurance);
        }


        public async Task<InsuranceDTO> CreateInsurance(Models.DTO.InsuranceDTO data)
        {
            if (data == null) throw new Exception("Data is null");
            var insurances = await GetAllAsync();

            bool hasInsuranceWithAccountId = insurances.Any(insurance => insurance.AccountId == data.AccountId);
            if (hasInsuranceWithAccountId == true) throw new Exception("Duplicate user");

            Insurance obj = new Insurance
            {
                RegisterPlace = data.RegisterPlace,
                CardOpenDate = data.CardOpenDate,
                AccountId = data.AccountId

            };
            await CreateAsync(obj);
            return data;
        }
        public async Task<InsuranceUpdateDTO> UpdateInsurance(Models.DTO.InsuranceUpdateDTO data) {
            if (data == null) throw new Exception("Data is null");

            var insurance = await GetAsync(t => t.InsuranceID == data.InsuranceID);
            insurance.CardOpenDate = data.CardOpenDate;
            insurance.RegisterPlace = data.RegisterPlace;
            
            await UpdateAsync(insurance);
            return data;
        }
    }
}
