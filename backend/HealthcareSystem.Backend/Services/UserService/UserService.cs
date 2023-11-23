using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Repositories;

namespace HealthcareSystem.Backend.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly ICustomerRequestRepository _customerRequestRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHealthRecordRepository _healthRecordRepository;
        private readonly IFeeAffectRepository _feeAffectRepository;

        public UserService(ICustomerRequestRepository customerRequestRepository, IUserRepository userRepository, IHealthRecordRepository healthRecordRepository, IFeeAffectRepository feeAffectRepository)
        {
            _customerRequestRepository = customerRequestRepository;
            _userRepository = userRepository;
            _healthRecordRepository = healthRecordRepository;
            _feeAffectRepository = feeAffectRepository;
        }

        public async Task<CustomerRequestDomain> CreateCustomerRequestAsync(CustomerRequestDomain customerRequest)
        {
            return await _customerRequestRepository.CreateCustomerRequest(customerRequest);
        }

        public async Task<bool> DeleteCustomerRequestByIdAsync(int requestId)
        {
            return await _customerRequestRepository.DeleteCustomerRequestByIdAsync(requestId);
        }

        public async Task<List<CustomerRequestDomain>> GetAllCustomerRequestsAsync()
        {
            return await _customerRequestRepository.GetAllCustomerRequestsAsync();
        }

        public async Task<CustomerRequestDomain> GetCustomerRequestByIdAsync(int requestId)
        {
            return await _customerRequestRepository.GetCustomerRequestByIdAsync(requestId);
        }

        public async Task<double> GetFeesIncrease(int UserID)
        {
            var listIdAffect =  await _healthRecordRepository.GetListFeeAffectId(UserID);
            var listFeeAffect = await _feeAffectRepository.GetAll();
            double increasePercent = 0;
            foreach(var id in listIdAffect)
            {
                var temp = listFeeAffect.Find(x => x.FeeAffectId == id.Key);
                if (temp == null) throw new Exception("Error. Please check key in database.");
                increasePercent += temp.PercentIncreaseInFirst;
                double temp2 = Math.Min((id.Value - 1) * temp.PercentIncreaseInNext, temp.MaxPercentIncrease);
                increasePercent += temp2;
            }
            return increasePercent;
        }

        public async Task<UserPriceDomain> GetUserInfoForPriceByIdAsync(int UserID)
        {
            return await _userRepository.GetUserInfoForPriceByIdAsync(UserID);
        }

        //public Task<int> GetFeesIncrease(int UserID)
        //{
        //    return 1;
        //    //int PhaseRecordUser = _hel
        //}


    }
}
