﻿using Azure.Core;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories;
using Microsoft.IdentityModel.Tokens;
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


        public UserService(ICustomerRequestRepository customerRequestRepository, IUserRepository userRepository, IHealthRecordRepository healthRecordRepository, IFeeAffectRepository feeAffectRepository)
        {
            _customerRequestRepository = customerRequestRepository;
            _userRepository = userRepository;
            _healthRecordRepository = healthRecordRepository;
            _feeAffectRepository = feeAffectRepository;

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

        public async Task<PaymentDomain> AcceptCustomerRequest(int Accept)
        {
            return await _customerRequestRepository.AcceptCustomerRequest(Accept);
        }
        public async Task<bool> RefusedCustomerRequest(int id)
        {
            return await _customerRequestRepository.RefusedCustomerRequest(id);
        }
        public async Task<bool> CompleteCustomerRequest(int id)
        {
            return await _customerRequestRepository.CompleteCustomerRequest(id);
        }
        
    }
}
