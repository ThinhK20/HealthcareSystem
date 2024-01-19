using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FakeItEasy;
using FluentAssertions;
using HealthcareSystem.Backend.Controllers;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Services.RefundRequestService;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace backend.Tests.Controllers
{
    public class RefundRequestControllerTests
    {
        private readonly IRefundRequestService _refundRequestService;

        public RefundRequestControllerTests()
        {
            _refundRequestService = A.Fake<IRefundRequestService>();

        }

        [Fact]
        public async Task RefundRequestController_CreateNewRefundRequest_ReturnOk()
        {

            RefundRequestDTO refundRequestDTO = A.Fake<RefundRequestDTO>();
            RefundRequestDTO createdRefundRequest = A.Fake<RefundRequestDTO>();

            A.CallTo(() => _refundRequestService.CreateRefundRequestAsync(refundRequestDTO))
                .Returns(Task.FromResult(createdRefundRequest));

            var controller = new RefundRequestController(_refundRequestService);


            var result = await controller.CreateNewRefundRequest(refundRequestDTO);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }
        [Fact]
        public async Task RefundRequestController_CreateNewRefundRequest_ReturnBadRequest()
        {

            RefundRequestDTO refundRequestDTO =null;
            RefundRequestDTO createdRefundRequest = A.Fake<RefundRequestDTO>();

            A.CallTo(() => _refundRequestService.CreateRefundRequestAsync(refundRequestDTO))
                .Returns(Task.FromResult(createdRefundRequest));

            var controller = new RefundRequestController(_refundRequestService);


            var result = await controller.CreateNewRefundRequest(refundRequestDTO);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(BadRequestResult));
        }
        [Fact]
        public async Task RefundRequestController_GetAllRefundRequests_ReturnOk()
        {

            var refundRequests = A.Fake<List<RefundRequestDomain>>();
            A.CallTo(() => _refundRequestService.GetAllRefundRequestsAsync())
                .Returns(Task.FromResult(refundRequests));

            var controller = new RefundRequestController(_refundRequestService);


            var result = await controller.GetAllRefundRequests();


            result.Should().NotBeNull();
            result.Should().BeOfType<ActionResult<List<RefundRequestDomain>>>();

        }

        [Fact]
        public async Task RefundRequestController_GetRefundRequest_ReturnOk()
        {

            int refundId = 1;
            var refundRequest = A.Fake<RefundRequestDomain>();

            A.CallTo(() => _refundRequestService.GetRefundRequestByIdAsync(refundId))
                .Returns(Task.FromResult(refundRequest));

            var controller = new RefundRequestController(_refundRequestService);


            var result = await controller.GetRefundRequest(refundId);


            result.Should().NotBeNull();
            result.Should().BeOfType<ActionResult<RefundRequestDomain>>();

        }
        [Fact]
        public async Task RefundRequestController_GetRefundRequest_ReturnBadRequest()
        {

            int refundId = -1;
            var refundRequest = A.Fake<RefundRequestDomain>();

            A.CallTo(() => _refundRequestService.GetRefundRequestByIdAsync(refundId))
                .Returns(Task.FromResult(refundRequest));

            var controller = new RefundRequestController(_refundRequestService);


            var result = await controller.GetRefundRequest(refundId);


            result.Should().NotBeNull();
            result.Result.Should().BeOfType<BadRequestResult>();

        }
        [Fact]
        public async Task RefundRequestController_GetRefundRequestByAccountId_ReturnOk()
        {

            int accountId = 1;
            var refundRequests = A.Fake<List<RefundRequestDomain>>();

            A.CallTo(() => _refundRequestService.GetRefundRequestByAccountIdAsync(accountId))
                .Returns(Task.FromResult(refundRequests));

            var controller = new RefundRequestController(_refundRequestService);


            var result = await controller.GetRefundRequestByAccountId(accountId);


            result.Should().NotBeNull();
            result.Should().BeOfType<ActionResult<RefundRequestDomain>>();
        }
        [Fact]
        public async Task RefundRequestController_GetRefundRequestByAccountId_ReturnBadRequest()
        {

            int accountId = -1;
            var refundRequests = A.Fake<List<RefundRequestDomain>>();

            A.CallTo(() => _refundRequestService.GetRefundRequestByAccountIdAsync(accountId))
                .Returns(Task.FromResult(refundRequests));

            var controller = new RefundRequestController(_refundRequestService);


            var result = await controller.GetRefundRequestByAccountId(accountId);


            result.Should().NotBeNull();
            result.Result.Should().BeOfType<BadRequestResult>();
        }
        [Fact]
        public async Task RefundRequestController_AcceptRefundRequest_ReturnOk()
        {

            int refundId = 1;
            bool refundRequest = true;

            A.CallTo(() => _refundRequestService.AcceptRefundRequestByIdAsync(refundId))
                .Returns(Task.FromResult(refundRequest));

            var controller = new RefundRequestController(_refundRequestService);


            var result = await controller.AcceptRefundRequest(refundId);


            result.Should().NotBeNull();
            result.Should().BeOfType<ActionResult<RefundRequestDomain>>();
        }
        [Fact]
        public async Task RefundRequestController_AcceptRefundRequest_ReturnBadRequest()
        {

            int refundId = -1;
            bool refundRequest = true;

            A.CallTo(() => _refundRequestService.AcceptRefundRequestByIdAsync(refundId))
                .Returns(Task.FromResult(refundRequest));

            var controller = new RefundRequestController(_refundRequestService);


            var result = await controller.AcceptRefundRequest(refundId);


            result.Should().NotBeNull();
            result.Result.Should().BeOfType<BadRequestResult>();
        }
        [Fact]
        public async Task RefundRequestController_RejectRefundRequest_ReturnBadRequest()
        {

            int refundId = -1;
            bool refundRequest = true;

            A.CallTo(() => _refundRequestService.RejectRefundRequestByIdAsync(refundId))
                .Returns(Task.FromResult(refundRequest));

            var controller = new RefundRequestController(_refundRequestService);


            var result = await controller.RejectRefundRequest(refundId);


            result.Should().NotBeNull();
            result.Result.Should().BeOfType<BadRequestResult>();
        }

        [Fact]
        public async Task RefundRequestController_PendingRefundRequest_ReturnOk()
        {

            int refundId = 1;
            bool refundRequest = true;

            A.CallTo(() => _refundRequestService.PendingRefundRequestByIdAsync(refundId))
                .Returns(Task.FromResult(refundRequest));

            var controller = new RefundRequestController(_refundRequestService);


            var result = await controller.PendingRefundRequest(refundId);


            result.Should().NotBeNull();
            result.Should().BeOfType<ActionResult<RefundRequestDomain>>();
        }
        [Fact]
        public async Task RefundRequestController_PendingRefundRequest_ReturnBadRequest()
        {

            int refundId = -1;
            bool refundRequest = true;

            A.CallTo(() => _refundRequestService.PendingRefundRequestByIdAsync(refundId))
                .Returns(Task.FromResult(refundRequest));

            var controller = new RefundRequestController(_refundRequestService);


            var result = await controller.PendingRefundRequest(refundId);


            result.Should().NotBeNull();
            result.Result.Should().BeOfType<BadRequestResult>();
        }
        [Fact]
        public async Task RefundRequestController_UpdateRefundRequest_ReturnOk()
        {

            RefundRequestDTO refundRequestDTO = A.Fake<RefundRequestDTO>();
            bool refundRequest = true;

            A.CallTo(() => _refundRequestService.UpdateRefundRequestAsync(refundRequestDTO))
                .Returns(Task.FromResult(refundRequest));

            var controller = new RefundRequestController(_refundRequestService);


            var result = await controller.UpdateRefundRequest(refundRequestDTO);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }
        [Fact]
        public async Task RefundRequestController_UpdateRefundRequest_ReturnBadRequest()
        {

            RefundRequestDTO refundRequestDTO = null;
            bool refundRequest = true;

            A.CallTo(() => _refundRequestService.UpdateRefundRequestAsync(refundRequestDTO))
                .Returns(Task.FromResult(refundRequest));

            var controller = new RefundRequestController(_refundRequestService);


            var result = await controller.UpdateRefundRequest(refundRequestDTO);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(BadRequestResult));
        }
    }
}
