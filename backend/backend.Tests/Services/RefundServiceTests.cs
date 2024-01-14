using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using FakeItEasy;
using FluentAssertions;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories.RefundRequestRepository;
using HealthcareSystem.Backend.Services.RefundRequestService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Tests.Services
{
    public class RefundRequestServiceTests
    {
        private readonly IRefundRequestRepository _refundRequestRepository;
        private readonly IRefundRequestService _refundRequestService;

        public RefundRequestServiceTests()
        {
            _refundRequestRepository = A.Fake<IRefundRequestRepository>();
            _refundRequestService = new RefundRequestService(_refundRequestRepository);
        }

        [Fact]
        public async Task CreateRefundRequestAsync_ShouldReturnRefundRequestDTO()
        {
            // Arrange
            var refundRequestDTO = A.Fake<RefundRequestDTO>();
            A.CallTo(() => _refundRequestRepository.CreateRefundRequestAsync(refundRequestDTO)).Returns(Task.FromResult(refundRequestDTO));

            // Act
            var result = await _refundRequestService.CreateRefundRequestAsync(refundRequestDTO);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeEquivalentTo(refundRequestDTO);
        }


        [Fact]
        public async Task GetAllRefundRequestsAsync_ShouldReturnListOfRefundRequestDomain()
        {
            // Arrange
            var refundRequests = A.Fake<List<RefundRequestDomain>>();
            A.CallTo(() => _refundRequestRepository.GetAllRefundRequestsAsync()).Returns(Task.FromResult(refundRequests));

            // Act
            var result = await _refundRequestService.GetAllRefundRequestsAsync();

            // Assert
            result.Should().NotBeNull().And.BeAssignableTo<List<RefundRequestDomain>>();
            result.Should().BeEquivalentTo(refundRequests);
        }

        [Fact]
        public async Task GetRefundRequestByIdAsync_ShouldReturnRefundRequestDomain()
        {
            // Arrange
            int refundId = 1;
            var refundRequest = A.Fake<RefundRequestDomain>();
            A.CallTo(() => _refundRequestRepository.GetRefundRequestByIdAsync(refundId)).Returns(Task.FromResult(refundRequest));

            // Act
            var result = await _refundRequestService.GetRefundRequestByIdAsync(refundId);

            // Assert
            result.Should().NotBeNull().And.BeAssignableTo<RefundRequestDomain>();
            result.Should().BeEquivalentTo(refundRequest);
        }

        [Fact]
        public async Task AcceptRefundRequestByIdAsync_ShouldReturnTrue()
        {
            // Arrange
            int refundId = 1;
            A.CallTo(() => _refundRequestRepository.AcceptRefundRequestByIdAsync(refundId)).Returns(Task.FromResult(true));

            // Act
            var result = await _refundRequestService.AcceptRefundRequestByIdAsync(refundId);

            // Assert
            result.Should().BeTrue();
        }

        [Fact]
        public async Task PendingRefundRequestByIdAsync_ShouldReturnTrue()
        {
            // Arrange
            int refundId = 1;
            A.CallTo(() => _refundRequestRepository.PendingRefundRequestByIdAsync(refundId)).Returns(Task.FromResult(true));

            // Act
            var result = await _refundRequestService.PendingRefundRequestByIdAsync(refundId);

            // Assert
            result.Should().BeTrue();
        }

        [Fact]
        public async Task RejectRefundRequestByIdAsync_ShouldReturnTrue()
        {
            // Arrange
            int refundId = 1;
            A.CallTo(() => _refundRequestRepository.RejectRefundRequestByIdAsync(refundId)).Returns(Task.FromResult(true));

            // Act
            var result = await _refundRequestService.RejectRefundRequestByIdAsync(refundId);

            // Assert
            result.Should().BeTrue();
        }

        [Fact]
        public async Task GetRefundRequestByAccountIdAsync_ShouldReturnListOfRefundRequestDomain()
        {
            // Arrange
            int accountId = 1;
            var refundRequests = A.Fake<List<RefundRequestDomain>>();
            A.CallTo(() => _refundRequestRepository.GetRefundRequestByAccountIdAsync(accountId)).Returns(Task.FromResult(refundRequests));

            // Act
            var result = await _refundRequestService.GetRefundRequestByAccountIdAsync(accountId);

            // Assert
            result.Should().NotBeNull().And.BeAssignableTo<List<RefundRequestDomain>>();
            result.Should().BeEquivalentTo(refundRequests);
        }

        [Fact]
        public async Task UpdateRefundRequestAsync_ShouldReturnTrue()
        {
            // Arrange
            var refundRequestDTO = A.Fake<RefundRequestDTO>();
            A.CallTo(() => _refundRequestRepository.UpdateRefundRequestAsync(refundRequestDTO)).Returns(Task.FromResult(true));

            // Act
            var result = await _refundRequestService.UpdateRefundRequestAsync(refundRequestDTO);

            // Assert
            result.Should().BeTrue();
        }
    }
}
