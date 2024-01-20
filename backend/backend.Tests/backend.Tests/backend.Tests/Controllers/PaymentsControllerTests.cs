using AutoMapper;
using FakeItEasy;
using FluentAssertions;
using HealthcareSystem.Backend.Controllers;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Repositories.InsuranceDetailRepository;
using HealthcareSystem.Backend.Services.PaymentService;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace backend.Tests.Controllers
{
    public class PaymentsControllerTests
    {
        private readonly IPaymentService _paymentService;
        private readonly IInsuranceDetailRepository _insuranceDetailRepository;

        public PaymentsControllerTests()
        {
            _paymentService = A.Fake<IPaymentService>();
            _insuranceDetailRepository = A.Fake<IInsuranceDetailRepository>();
        }

        [Fact]
        public async Task PaymentsController_CreatePayment_ReturnOK()
        {
          
            var paymentCreateDTO = A.Fake<PaymentCreateDTO>();
            A.CallTo(() => _paymentService.CreatePayment(paymentCreateDTO)).Returns(Task.FromResult(true));


            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);

    
            var result = await controller.CreatePayment(paymentCreateDTO);

        
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }

        [Fact]
        public async Task PaymentsController_CreatePayment_ReturnBadRequest()
        {

            var paymentCreateDTO = A.Fake<PaymentCreateDTO>();
            A.CallTo(() => _paymentService.CreatePayment(paymentCreateDTO)).Returns(Task.FromResult(true));


            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);


            var result = await controller.CreatePayment(null);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(BadRequestObjectResult));
        }

        [Fact]
        public async Task PaymentsController_UpdateStatus_ReturnOK()
        {
          
            int paymentId = 1;
            A.CallTo(() => _paymentService.UpdateStatus(paymentId)).Returns(Task.FromResult(true));

            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);

    
            var result = await controller.UpdateStatus(paymentId);

        
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }
        [Fact]
        public async Task PaymentsController_UpdateStatus_ReturnBadRequest()
        {

            int paymentId = -1;
            A.CallTo(() => _paymentService.UpdateStatus(paymentId)).Returns(Task.FromResult(true));

            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);


            var result = await controller.UpdateStatus(paymentId);

            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(BadRequestObjectResult));
        }
        [Fact]
        public async Task PaymentsController_DeletePayment_ReturnOK()
        {
          
            int paymentId = 1;
            A.CallTo(() => _paymentService.DeletePaymentByIdAsync(paymentId)).Returns(Task.FromResult(true));

            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);

    
            var result = await controller.DeletePayment(paymentId);

        
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }
        [Fact]
        public async Task PaymentsController_DeletePayment_ReturnBadRequest()
        {

            int paymentId = -1;
            A.CallTo(() => _paymentService.DeletePaymentByIdAsync(paymentId)).Returns(Task.FromResult(true));

            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);


            var result = await controller.DeletePayment(paymentId);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(BadRequestObjectResult));
        }
        [Fact]
        public async Task PaymentsController_GetAllPaymentRequests_ReturnOK()
        {
          
            var payments = new List<PaymentDomain> { /* Add some fake payments */ };
            A.CallTo(() => _paymentService.GetAllPaymentRequestsAsync()).Returns(Task.FromResult(payments));

            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);

    
            var result = await controller.GetAllPaymentRequests();

        
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }
        [Fact]
        public async Task PaymentsController_GetPaymentByRequestID_ReturnOK()
        {
          
            int requestID = 1;
            var payments = new List<PaymentDomain> { /* Add some fake payments */ };
            A.CallTo(() => _paymentService.GetPaymentByRequestID(requestID)).Returns(Task.FromResult(payments));

            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);

    
            var result = await controller.GetPaymentByRequestID(requestID);

        
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }
        [Fact]
        public async Task PaymentsController_GetPaymentByRequestID_ReturnBadRequest()
        {

            int requestID = -1;
            var payments = new List<PaymentDomain> { /* Add some fake payments */ };
            A.CallTo(() => _paymentService.GetPaymentByRequestID(requestID)).Returns(Task.FromResult(payments));

            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);


            var result = await controller.GetPaymentByRequestID(requestID);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(BadRequestObjectResult));
        }
        [Fact]
        public async Task PaymentsController_GetPaymentId_ReturnOK()
        {
          
            int paymentId = 1;
            var payment = new PaymentDomain { /* Add some fake data for payment */ };
            A.CallTo(() => _paymentService.GetPaymentIdAsync(paymentId)).Returns(Task.FromResult(payment));

            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);

    
            var result = await controller.GetPaymentId(paymentId);

        
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }

        [Fact]
        public async Task PaymentsController_GetPaymentId_ReturnNotFoundResult()
        {

            int paymentId = -1;
            var payment = new PaymentDomain { /* Add some fake data for payment */ };
            A.CallTo(() => _paymentService.GetPaymentIdAsync(paymentId)).Returns(Task.FromResult(payment));

            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);


            var result = await controller.GetPaymentId(paymentId);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(NotFoundResult));
        }
        [Fact]
        public async Task PaymentsController_GetInranceDetail_ReturnOK()
        {
          
            int insureID = 1;
            var insuranceDetail = new List<InsuranceDetailDomain> { };


            A.CallTo(() => _insuranceDetailRepository.GetByIdAsync(insureID)).Returns(Task.FromResult(insuranceDetail));

            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);

    
            var result = await controller.GetInranceDetail(insureID);

        
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }
        [Fact]
        public async Task PaymentsController_GetInranceDetail_ReturnBadRequest()
        {

            int insureID = -1;
            var insuranceDetail = new List<InsuranceDetailDomain> { };


            A.CallTo(() => _insuranceDetailRepository.GetByIdAsync(insureID)).Returns(Task.FromResult(insuranceDetail));

            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);


            var result = await controller.GetInranceDetail(insureID);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(BadRequestObjectResult));
        }
        [Fact]
        public async Task PaymentsController_CheckPayPal_ReturnOK()
        {
          
            int accountId = 1;
            var paymentInfo = new List<PaymentOfUserDTO> { /* Add some fake data for paymentInfo */ };
            A.CallTo(() => _paymentService.GetPaymentByUserID(accountId)).Returns(Task.FromResult(paymentInfo));

            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);

    
            var result = await controller.CheckPayPal(accountId);

        
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }
        [Fact]
        public async Task PaymentsController_CheckPayPal_ReturnBadRequset()
        {

            int accountId = -1;
            var paymentInfo = new List<PaymentOfUserDTO> { /* Add some fake data for paymentInfo */ };
            A.CallTo(() => _paymentService.GetPaymentByUserID(accountId)).Returns(Task.FromResult(paymentInfo));

            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);


            var result = await controller.CheckPayPal(accountId);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(BadRequestResult));
        }
        [Fact]
        public async Task PaymentsController_GetLinkCheckOut_ReturnOK()
        {
          
            var checkPayPalInfoDTO = A.Fake<CheckPayPalInfoDTO>();
            var checkInfo = "fakeCheckInfo";
            A.CallTo(() => _paymentService.GetCheckOutLink(checkPayPalInfoDTO)).Returns(Task.FromResult(checkInfo));

            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);

    
            var result = await controller.CheckPayPal(checkPayPalInfoDTO);

        
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }
        [Fact]
        public async Task PaymentsController_GetLinkCheckOut_ReturnBadRequest()
        {

            CheckPayPalInfoDTO checkPayPalInfoDTO = null;
            var checkInfo = "fakeCheckInfo";
            A.CallTo(() => _paymentService.GetCheckOutLink(checkPayPalInfoDTO)).Returns(Task.FromResult(checkInfo));

            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);


            var result = await controller.CheckPayPal(checkPayPalInfoDTO);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(BadRequestResult));
        }
        [Fact]
        public async Task PaymentsController_ConfirmPayment_ReturnOK()
        {
          
            string token = "fakeToken";
            string payerId = "fakePayerId";
            A.CallTo(() => _paymentService.ConfirmPayment(token, payerId)).Returns(Task.FromResult(true));

            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);

    
            var result = await controller.ConfirmPayment(token, payerId);

        
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }
        [Fact]
        public async Task PaymentsController_ConfirmPayment_ReturnBadRequest()
        {

            string token = null;
            string payerId = null;
            A.CallTo(() => _paymentService.ConfirmPayment(token, payerId)).Returns(Task.FromResult(true));

            var controller = new PaymentsController(_paymentService, _insuranceDetailRepository);


            var result = await controller.ConfirmPayment(token, payerId);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(BadRequestResult));
        }

    }
}
