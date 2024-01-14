using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories;
using HealthcareSystem.Backend.Services.PackagePoliceService;
using HealthcareSystem.Backend.Services.UserService;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace HealthcareSystem.Backend.Utils
{
    public class PriceCalculateModule
    {
        private readonly IUserRepository _userRepository;
        private readonly IBasicPriceRepository _basicPriceRepository;
        private readonly IHealthRecordRepository _healthRecordRepository;
        private readonly IFeeAffectRepository _feeAffectRepository;
        public PriceCalculateModule(IUserRepository userRepository, IBasicPriceRepository basicPriceRepository, IHealthRecordRepository healthRecordRepository, IFeeAffectRepository feeAffectRepository)
        {
            _userRepository = userRepository;
            _basicPriceRepository = basicPriceRepository;
            _healthRecordRepository = healthRecordRepository;
            _feeAffectRepository = feeAffectRepository;
        }

        public async Task<double> CalculatePriceMonth(int UserID, int PackageID)
        {

            try
            {
                var userInfo = await _userRepository.GetUserInfoForPriceByIdAsync(UserID);
                DateTime birthDate = DateTime.Parse(userInfo.Birthdate);
                var today = DateTime.Today;
                int age = today.Year - birthDate.Year;
                string gender = userInfo.Gender;
                var basicPriceInfo = await _basicPriceRepository.GetBasicPrice(PackageID, age, gender);
                double basicPrice = (double)basicPriceInfo.Price;
                var IncreasePercent = await GetFeesIncrease(UserID);
                var price = basicPrice + (basicPrice * IncreasePercent / 100);
                return price;
            }
            catch (Exception ex)
            {
                throw new Exception("Error. Please check key in database.");
            }
        }

        private async Task<double> GetFeesIncrease(int UserID)
        {
            var listIdAffect = await _healthRecordRepository.GetListFeeAffectId(UserID);
            var listFeeAffect = await _feeAffectRepository.GetAll();
            if (listIdAffect == null) return 0;
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

        public async Task<double> CalculatePriceByPeriod(int AccountId, int PackageID, int Month)
        {
            try
            {
                if (Month == 3 || Month == 6 || Month == 12)
                {
                    var User = await _userRepository.GetUserByAccount(AccountId);
                    var userInfo = await _userRepository.GetUserInfoForPriceByIdAsync(User.UserId);
                    DateTime birthDate = DateTime.Parse(userInfo.Birthdate);
                    var today = DateTime.Today;
                    int age = today.Year - birthDate.Year;
                    string gender = userInfo.Gender;
                    var basicPriceInfo = await _basicPriceRepository.GetBasicPrice(PackageID, age, gender);
                    double basicPrice = (double)basicPriceInfo.Price;
                    var IncreasePercent = await GetFeesIncrease(User.UserId);
                    var priceMonth = basicPrice + (basicPrice * IncreasePercent / 100);
                    double price = 0;
                    if (Month == 3) price = priceMonth * 3 * 0.98;
                    if (Month == 6) price = priceMonth * 6 * 0.96;
                    if (Month == 12) price = priceMonth * 12 * 0.92;
                    return price;
                }
                else
                {
                    throw new Exception("No Support.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
