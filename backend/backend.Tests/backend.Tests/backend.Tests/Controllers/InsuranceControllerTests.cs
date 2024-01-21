using FakeItEasy;
using FluentAssertions;
using HealthcareSystem.Backend.Controllers;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories.InsuranceRepository;
using Microsoft.AspNetCore.Mvc;

namespace backend.Tests.Controllers
{
    public class InsuranceControllerTests
    {
        private readonly IInsuranceRepository _insuranceRepository;
        public InsuranceControllerTests()
        {
            _insuranceRepository = A.Fake<IInsuranceRepository>();
        }

        private InsuranceController GetController()
        {
            return new InsuranceController(_insuranceRepository);
        }

        [Fact]
        public async Task InsuranceController_GetAllInsurances_ReturnOk()
        {
            var listInsurances = A.Fake<List<InsuranceDomain>>();


            A.CallTo(() => _insuranceRepository.GetAllInsurancesAsync()).Returns(Task.FromResult(listInsurances));

            // Assert
            var controller = GetController();
            var result = await controller.GetAllInsurances();

            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(ActionResult<List<InsuranceDomain>>));
        }


        [Fact]
        public async Task InsuranceController_GetInsurance_ReturnOk()
        {
            var fakeInsurances = A.Fake<List<InsuranceDomain>>();
            var id = 1;

            A.CallTo(() => _insuranceRepository.GetAllInsurancesAsync()).Returns(Task.FromResult(fakeInsurances));



            // Assert
            var controller = GetController();
            var result = await controller.GetInsurance(id);

            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(ActionResult<InsuranceDomain>));
        }


        [Fact]
        public async Task InsuranceController_Delete_ReturnOk()
        {
            var insuranceId = 1;
            var fakeInsurance = A.Fake<InsuranceDomain>();

            A.CallTo(() => _insuranceRepository.Delete(insuranceId)).Returns(Task.FromResult(fakeInsurance));



            var controller = GetController();
            var result = await controller.Delete(insuranceId);

            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(ActionResult<InsuranceDomain>));
        }

        [Fact]
        public async Task InsuranceController_Create_ReturnOk()
        {
            // Arrange
            var fakeInsurance = A.Fake<InsuranceDTO>();

            InsuranceDTO policy = A.Fake<InsuranceDTO>();
            InsuranceDTO policyUpdate = new InsuranceDTO
            {
                RegisterPlace = policy.RegisterPlace,
                CardOpenDate = policy.CardOpenDate,
                AccountId = policy.AccountId,

            };


            A.CallTo(() => _insuranceRepository.CreateInsurance(policyUpdate))
                .Returns(Task.FromResult(fakeInsurance));


            var controller = GetController();
            var result = await controller.Create(policyUpdate);

            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(ActionResult<InsuranceDomain>));
        }


        [Fact]
        public async Task InsuranceController_Update_ReturnOk()
        {
            // Arrange
            var fakeInsurance = A.Fake<InsuranceUpdateDTO>();

            InsuranceUpdateDTO policy = A.Fake<InsuranceUpdateDTO>();
            InsuranceUpdateDTO policyUpdate = new InsuranceUpdateDTO
            {
                InsuranceID = policy.InsuranceID,
                RegisterPlace = policy.RegisterPlace,
                CardOpenDate = policy.CardOpenDate,

            };


            A.CallTo(() => _insuranceRepository.UpdateInsurance(policyUpdate))
                .Returns(Task.FromResult(fakeInsurance));


            var controller = GetController();
            var result = await controller.Update(policyUpdate);

            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(ActionResult<InsuranceDomain>));
        }

        [Fact]
        public async Task InsuranceController_Create_ReturnBadRequest()
        {
            var fakeInsurance = A.Fake<InsuranceDTO>();
            InsuranceDTO policy = A.Fake<InsuranceDTO>();
            InsuranceDTO policyUpdate = null;

            A.CallTo(() => _insuranceRepository.CreateInsurance(policyUpdate)).Returns(Task.FromResult<InsuranceDTO>(policy));

            var controller = GetController();
            var result = await controller.Create(policyUpdate);

            result.Should().NotBeNull();
            result.Result.Should().BeOfType<BadRequestObjectResult>();
        }
        [Fact]
        public async Task InsuranceController_Update_ReturnBadRequest()
        {
            var fakeInsurance = A.Fake<InsuranceUpdateDTO>();
            InsuranceUpdateDTO policy = A.Fake<InsuranceUpdateDTO>();
            InsuranceUpdateDTO policyUpdate = null;

            A.CallTo(() => _insuranceRepository.UpdateInsurance(policyUpdate)).Returns(Task.FromResult<InsuranceUpdateDTO>(null));

            var controller = GetController();
            var result = await controller.Update(policyUpdate);

            result.Should().NotBeNull();
            result.Result.Should().BeOfType<BadRequestObjectResult>();
        }

        [Fact]
        public async Task InsuranceController_Delete_ReturnBadRequest()
        {
            var insuranceId = -1;
            var fakeInsurance = A.Fake<InsuranceDomain>();

            A.CallTo(() => _insuranceRepository.Delete(insuranceId)).Returns(Task.FromResult(fakeInsurance));



            var controller = GetController();
            var result = await controller.Delete(insuranceId);

            result.Should().NotBeNull();
            result.Result.Should().BeOfType<BadRequestResult>();
        }
    }
}
