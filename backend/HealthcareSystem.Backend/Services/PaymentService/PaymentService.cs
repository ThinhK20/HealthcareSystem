using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories;
using HealthcareSystem.Backend.Services.UserService;
using Microsoft.VisualBasic;
using HealthcareSystem.Backend.Utils;
using static System.Runtime.InteropServices.JavaScript.JSType;
using HealthcareSystem.Backend.Models.PayPal;
using Newtonsoft.Json.Linq;
using CloudinaryDotNet.Actions;

namespace HealthcareSystem.Backend.Services.PaymentService
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly IUserService _userService;
        private readonly PayPalModule _payPalModule;
        private readonly IConfiguration _configuration;
        private readonly PayPalSettingDomain _payPalSetting;
        private readonly ICustomerRequestRepository _customerRequestRepository;

        public PaymentService(IConfiguration configuration, IPaymentRepository paymentRepository, IUserService userService, ICustomerRequestRepository customerRequestRepository)
        {
            _configuration = configuration;
            _paymentRepository = paymentRepository;
            _userService = userService;
            _payPalModule = new PayPalModule();
            _payPalSetting = _configuration.GetSection("PayPal").Get<PayPalSettingDomain>()!;
            _customerRequestRepository = customerRequestRepository;

        }
        public async Task<bool> CreatePayment(PaymentCreateDTO payment)
        {
            if (payment == null) throw new Exception("Payment request not found.");
            var dataRequest = await _userService.GetCustomerRequestByIdAsync(payment.RequestId);
            var month = 0;
            if (dataRequest.Periodic == "quarter ") month = 3;
            if (dataRequest.Periodic == "half year") month = 6;
            if (dataRequest.Periodic == "year") month = 12;
            if (month == 0) throw new Exception("request not activity.");
            for (var i = 0; i < month; i++)
            {
                Payment pay = new Payment
                {
                    RequestId = payment.RequestId,
                    CreatedDate = DateTime.Now.AddMonths(i * month),
                    ExpirationDate = DateTime.Now.AddMonths(i * month).AddDays(7),
                    ExpirationPaypal = null,
                    Status = false,
                    Price = payment.Price * month / 12,
                    UpdatedDate = null,
                    LinkCheckOut = null,
                    PaypalEmail = null,
                };
                await _paymentRepository.CreatePayment(pay);
            }
            return true;
        }

        public async Task<bool> DeletePaymentByIdAsync(int PaymentID)
        {
            return await _paymentRepository.DeletePaymentByIdAsync(PaymentID);
        }
        public async Task<bool> UpdateStatus(int PaymentID)
        {
            return await _paymentRepository.UpdateStatus(PaymentID);
        }
        public async Task<List<PaymentDomain>> GetAllPaymentRequestsAsync()
        {
            return await _paymentRepository.GetAllPaymentRequestsAsync();
        }

        public async Task<List<PaymentDomain>> GetPaymentedAsync()
        {
            return await _paymentRepository.GetPaymentedAsync();
        }

        public async Task<PaymentDomain> GetPaymentIdAsync(int PaymentId)
        {
            return await _paymentRepository.GetPaymentIdAsync(PaymentId);
        }

        public async Task<List<PaymentDomain>> GetPaymentByRequestID(int requestID)
        {
            return await _paymentRepository.GetPaymentByRequestID(requestID);
        }

        public async Task<string> GetCheckOutLink(CheckPayPalInfoDTO info)
        {
            var resultCheck = await _paymentRepository.CheckStatusPayPal(info);
            if (resultCheck.status == "null") throw new Exception("Error.");
            else if (resultCheck.status == "No Link")
            {
                //Create Link checkout and add to db
                string tokenPaypal = await _payPalModule.GetToken(_payPalSetting.username, _payPalSetting.password, _payPalSetting.link);
                DateTime createdDate = DateTime.Now;
                CreateOrderReturn data = await _payPalModule.CreateOrder(_payPalSetting.link, tokenPaypal, (double)resultCheck.Price, _payPalSetting.returnPath);
                //Store to DB: Payment
                await _paymentRepository.UpdatePayPalInfo(info.PaymentId, createdDate, data.id, data.links[1].href);
                return data.links[1].href;
            }
            else if (resultCheck.status == "Time expired")
            {
                //Create new Link and add to db
                string tokenPaypal = await _payPalModule.GetToken(_payPalSetting.username, _payPalSetting.password, _payPalSetting.link);
                DateTime createdDate = DateTime.Now;
                CreateOrderReturn data = await _payPalModule.CreateOrder(_payPalSetting.link, tokenPaypal, (double)resultCheck.Price, _payPalSetting.returnPath);
                await _paymentRepository.UpdatePayPalInfo(info.PaymentId, createdDate, data.id, data.links[1].href);
                return data.links[1].href;
            }
            else
            {
                return resultCheck.LinkCheckOut;
            }
        }

        public async Task<bool> ConfirmPayment(string token, string PayerID)
        {
            var resultCheck = await _paymentRepository.findPaymentByToken(token);
            if (resultCheck == null) throw new Exception("Error.");
            string tokenPaypal = await _payPalModule.GetToken(_payPalSetting.username, _payPalSetting.password, _payPalSetting.link);
            DateTime updatedDate = DateTime.Now;
            bool result = await _payPalModule.ConfirmPaymentPalpal(token, _payPalSetting.link, tokenPaypal);
            if (result == true)
            {
                int requestId = await _paymentRepository.UpdatePayPalComplete(token, updatedDate);
                var listPayment = await _paymentRepository.GetAllPayment(requestId);
                var listAccept = listPayment.FindAll(x => x.Status == true);
                if (listAccept.Count == listPayment.Count)
                {
                    await _customerRequestRepository.CompleteCustomerRequest(requestId);
                }
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<List<PaymentOfUserDTO>> GetPaymentByUserID(int AccountID)
        {
            var temp = await _paymentRepository.GetPaymentByUserId(AccountID);
            return temp;
        }


    }
}
