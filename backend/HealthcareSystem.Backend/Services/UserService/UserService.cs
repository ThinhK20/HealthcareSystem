using Azure.Core;
using HealthcareSystem.Backend.Enums;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories;
using HealthcareSystem.Backend.Repositories.AccountRepository;
using HealthcareSystem.Backend.Repositories.InsuranceDetailRepository;
using HealthcareSystem.Backend.Repositories.InsuranceRepository;
using HealthcareSystem.Backend.Repositories.PolicyPackageRepository;
using HealthcareSystem.Backend.Services.PackagePoliceService;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace HealthcareSystem.Backend.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly ICustomerRequestRepository _customerRequestRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHealthRecordRepository _healthRecordRepository;
        private readonly IFeeAffectRepository _feeAffectRepository;
        private readonly IInsuranceDetailRepository _insuranceDetailRepository;
        private readonly IInsuranceRepository _insuranceRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IPolicyPackageRepository _policyPackageRepository;

        public UserService(ICustomerRequestRepository customerRequestRepository, IUserRepository userRepository, IHealthRecordRepository healthRecordRepository, IFeeAffectRepository feeAffectRepository, IInsuranceDetailRepository insuranceDetailRepository, IInsuranceRepository insuranceRepository, IAccountRepository accountRepository, IPolicyPackageRepository policyPackageRepository)
        {
            _customerRequestRepository = customerRequestRepository;
            _userRepository = userRepository;
            _healthRecordRepository = healthRecordRepository;
            _feeAffectRepository = feeAffectRepository;
            _insuranceDetailRepository = insuranceDetailRepository;
            _insuranceRepository = insuranceRepository;
            _accountRepository = accountRepository;
            _policyPackageRepository = policyPackageRepository;
        }

        public async Task<CustomerRequestCreateDTO> CreateCustomerRequestAsync(CustomerRequestCreateDTO customerRequest)
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
            var listIdAffect = await _healthRecordRepository.GetListFeeAffectId(UserID);
            var listFeeAffect = await _feeAffectRepository.GetAll();
            double increasePercent = 0;
            foreach (var id in listIdAffect)
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

        public async Task<bool> AcceptCustomerRequest(int Accept, int StaffId)
        {
            var result = await _customerRequestRepository.AcceptCustomerRequest(Accept, StaffId);
            var insuranceInfo = await _insuranceRepository.GetInsuranceByAccountIdAsync((int)result.accountId);
            var insuranceDetail = new InsuranceDetailDomain()
            {
                PackageID = result.packageId,
                InsureID = insuranceInfo.InsuranceID,
                DateStart = result.acceptAt,
                DateEnd = null,
                Status = "Not active"
            };
            await _insuranceDetailRepository.AddInsuranceDatail(insuranceDetail);
            return true;
        }
        public async Task<bool> RefusedCustomerRequest(int id, int staffId)
        {
            return await _customerRequestRepository.RefusedCustomerRequest(id, staffId);
        }
        public async Task<bool> CompleteCustomerRequest(int id)
        {
            return await _customerRequestRepository.CompleteCustomerRequest(id);
        }

        public async Task<UserDTO> CreateUser(UserDTO user)
        {
            return await _userRepository.CreateUser(user);
        }

        public async Task<UserGoogleDTO> checkEmailByGoogleLogin(UserDTO user)
        {
            return await _userRepository.checkEmailByGoogle(user);

        }

        public async Task<UserDTO> UpdateUser(UserDTO user)
        {
            return await _userRepository.UpdateUser(user);
        }

        public Task<UserDomain> GetUserByAccount(int AccountId)
        {
            return _userRepository.GetUserByAccount(AccountId);
        }
        public Task<List<UserDTO>> GetAllUsers()
        {
            return _userRepository.GetAllUsers();
        }
        public async Task<UserDTO> GetUserByEmail(string email)
        {
            return await _userRepository.GetUserByEmail(email);
        }

        public async Task<double> GetPriceForUser(int accountId, int packageId, string periodic)
        {
            var accountInfo = await _accountRepository.GetAccountByID(accountId);
            if (accountInfo == null)
            {
                throw new Exception("No account");
            }
            var packageInfo = await _policyPackageRepository.GetPolicyPackageByIdAsync(packageId);
            if (accountInfo == null)
            {
                throw new Exception("No package");
            }
            if (periodic != Periodic.Quarter && periodic != Periodic.HalfYear && periodic != Periodic.Year) throw new Exception("No support");
            return await _customerRequestRepository.getPriceForUser(accountId, packageId, periodic);
        }

        public async Task<List<HealthRecordDomain>> GetHealthRecords(int userId)
        {
            var userInfo = await _userRepository.GetUserInfoForPriceByIdAsync(userId);
            if (userInfo == null)
            {
                throw new Exception("userInfo");
            }
            var listHr = await _healthRecordRepository.GetListHR(userId);

            return listHr;
        }

        public async Task<bool> addnewHr(List<HealthRecordDTO> data)
        {
            if (data.Count == 0 || data == null) throw new Exception("No data");
            for (int i = 0; i < data.Count; i++)
            {
                if (i > 0 && data[i].UserID != data[i - 1].UserID) throw new Exception("No support");
                var userinfo = await _userRepository.GetUserInfoForPriceByIdAsync(data[i].UserID);
                if (userinfo == null) throw new Exception("No user");

                var feeAffect = await _feeAffectRepository.GetById(data[i].FeeAffectID);
                if (feeAffect == null) throw new Exception("No found fee affect");
            }
            var phase = await _healthRecordRepository.GetMaxPhaseHealthRecord(data[0].UserID) + 1;
            for (int i = 0; i < data.Count; i++)
            {
                HealthRecord healthRecord = new HealthRecord()
                {
                    UserID = data[i].UserID,
                    IndexRecord = i + 1,
                    Description = data[i].Description,
                    FeeAffectID = data[i].FeeAffectID,
                    Phase = phase,
                    RecordDate = data[i].RecordDate,
                };
                await _healthRecordRepository.InsertData(healthRecord);
            }
            return true;
        }

        public async Task<List<FeeAffectDomain>> getAllFeeAffect()
        {
            return await _feeAffectRepository.GetAll();
        }
    }
}
