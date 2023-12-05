using HealthcareSystem.Backend.Services.PackagePoliceService;
using HealthcareSystem.Backend.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace HealthcareSystem.Backend.Utils
{
    public class PriceCalculateModule
    {
        private readonly IUserService _userService;
        private readonly IPackagePoliceService _packagePoliceService;

        public PriceCalculateModule(IUserService userService, IPackagePoliceService packagePoliceService)
        {
            _userService = userService;
            _packagePoliceService = packagePoliceService;
        }
        public async Task<double> CalculatePriceMonth(int UserID, int PackageID)
        {

            try
            {
                var userInfo = await _userService.GetUserInfoForPriceByIdAsync(UserID);
                DateTime birthDate = DateTime.Parse(userInfo.Birthdate);
                var today = DateTime.Today;
                int age = today.Year - birthDate.Year;
                string gender = userInfo.Gender;
                var basicPriceInfo = await _packagePoliceService.GetBasicPriceOfPackage(PackageID, age, gender);
                double basicPrice = (double)basicPriceInfo.Price;
                var IncreasePercent = await _userService.GetFeesIncrease(UserID);
                var price = basicPrice + (basicPrice * IncreasePercent / 100);
                return price;
            }
            catch (Exception ex)
            {
                throw new Exception("Error. Please check key in database.");
            }
        }
        public async Task<double> CalculatePriceByPeriod(int UserID, int PackageID, int Month)
        {
            try
            {

                if (Month == 3 || Month == 6 || Month == 12)
                {
                    var userInfo = await _userService.GetUserInfoForPriceByIdAsync(UserID);
                    DateTime birthDate = DateTime.Parse(userInfo.Birthdate);
                    var today = DateTime.Today;
                    int age = today.Year - birthDate.Year;
                    string gender = userInfo.Gender;
                    var basicPriceInfo = await _packagePoliceService.GetBasicPriceOfPackage(PackageID, age, gender);
                    double basicPrice = (double)basicPriceInfo.Price;
                    var IncreasePercent = await _userService.GetFeesIncrease(UserID);
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
                throw new Exception("Error.");
            }
        }
    }
}
