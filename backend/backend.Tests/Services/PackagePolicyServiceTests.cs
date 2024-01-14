
using FluentAssertions;
using FakeItEasy;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories;
using HealthcareSystem.Backend.Repositories.PolicyPackageRepository;
using HealthcareSystem.Backend.Services.PackagePoliceService;
using HealthcareSystem.Backend.Models.Entity;

namespace backend.Tests.Services.PackagePoliceServiceTest
{
    public class PackagePoliceServiceTests
    {
        private readonly IBasicPriceRepository _basicPriceRepository;
        private readonly IPolicyPackageRepository _policyPackageRepository;
        private readonly IPackageDetailRepository _packageDetailRepository;
        private readonly IInsurancePolicyRepository _insurancePolicyRepository;
        private readonly IPackagePoliceService _packagePoliceService;

        public PackagePoliceServiceTests()
        {
            _basicPriceRepository = A.Fake<IBasicPriceRepository>();
            _policyPackageRepository = A.Fake<IPolicyPackageRepository>();
            _packageDetailRepository = A.Fake<IPackageDetailRepository>();
            _insurancePolicyRepository = A.Fake<IInsurancePolicyRepository>();
            _packagePoliceService = new PackagePoliceService(_basicPriceRepository, _policyPackageRepository, _packageDetailRepository, _insurancePolicyRepository);
        }

        [Fact]
        public async Task GetAllPolicyPackagesAsync_ShouldReturnListOfPolicyPackages()
        {
            // Arrange
            var fakePolicyPackages = A.Fake<List<PolicyPackageDomain>>();
            A.CallTo(() => _policyPackageRepository.GetAllPolicyPackagesAsync()).Returns(Task.FromResult(fakePolicyPackages));

            // Act
            var result = await _packagePoliceService.GetAllPolicyPackagesAsync();

            // Assert
            result.Should().NotBeNull().And.BeAssignableTo<List<PolicyPackageDomain>>();
            result.Should().BeEquivalentTo(fakePolicyPackages);
        }

        [Fact]
        public async Task GetBasicPriceOfPackage_ShouldReturnBasicPrice()
        {
            // Arrange
            var fakeBasicPrice = A.Fake<BasicPriceDomain>();
            A.CallTo(() => _basicPriceRepository.GetBasicPrice(A<int>._, A<int>._, A<string>._)).Returns(Task.FromResult(fakeBasicPrice));

            // Act
            var result = await _packagePoliceService.GetBasicPriceOfPackage(1, 25, "Male");

            // Assert

            result.Should().NotBeNull().And.BeAssignableTo<BasicPriceDomain>();
            result.Should().BeEquivalentTo(fakeBasicPrice);
        }

        [Fact]
        public async Task GetPolicyPackageByIdAsync_ShouldReturnPolicyPackage()
        {
            // Arrange
            var fakePolicyPackage = A.Fake<PolicyPackageDomain>();
            A.CallTo(() => _policyPackageRepository.GetPolicyPackageByIdAsync(A<int>._)).Returns(Task.FromResult(fakePolicyPackage));

            // Act
            var result = await _packagePoliceService.GetPolicyPackageByIdAsync(1);

            result.Should().NotBeNull().And.BeAssignableTo<PolicyPackageDomain>();
            result.Should().BeEquivalentTo(fakePolicyPackage);
        }

        [Fact]
        public async Task CreateNewPackage_ShouldReturnTrueForInValidInput()
        {
            // Arrange
            var fakeDetailCreate = A.Fake<PackagePolicyCreateDTO>();
            var fakeBasicPriceCreates = A.CollectionOfFake<BasicPriceCreateDTO>(2);
            var fakePackageDetailCreates = A.CollectionOfFake<PackageDetailCreateDTO>(2);
            fakeDetailCreate.basicPriceCreates = (List<BasicPriceCreateDTO>)fakeBasicPriceCreates;
            fakeDetailCreate.packageDetailCreates = (List<PackageDetailCreateDTO>)fakePackageDetailCreates;

            A.CallTo(() => _insurancePolicyRepository.GetByIdAsync(A<int>._)).Returns(Task.FromResult(new InsurancePolicy()));
            A.CallTo(() => _policyPackageRepository.CreateNew(A<string>._, A<string>._)).Returns(Task.FromResult(1));

            // Act
            var result = await _packagePoliceService.CreateNewPackage(fakeDetailCreate);

            // Assert
            result.Should().BeFalse();
        }

        [Fact]
        public async Task CreateNewPackage_ShouldReturnFalseForInvalidPackageDetailCreateInput()
        {
            // Arrange
            var fakeDetailCreate = A.Fake<PackagePolicyCreateDTO>();
            var fakePackageDetailCreates = new List<PackageDetailCreateDTO>
            {
                new PackageDetailCreateDTO { PayoutPrice = 2, MaxRefundPerDay = -1, MaxRefundPerYear = 0, MaxRefundPerExamination = 3 },
                new PackageDetailCreateDTO { PayoutPrice = 1, MaxRefundPerDay = 1, MaxRefundPerYear = 1, MaxRefundPerExamination = 1 }
            };
            fakeDetailCreate.packageDetailCreates = fakePackageDetailCreates;

            // Act
            var result = await _packagePoliceService.CreateNewPackage(fakeDetailCreate);

            // Assert
            result.Should().BeFalse();
        }
    }
}
