using AutoMapper;
using FakeItEasy;
using FluentAssertions;
using HealthcareSystem.Backend.Controllers;
using HealthcareSystem.Backend.Enums;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Services.PackagePoliceService;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace backend.Tests.Controllers
{
    public class PolicyPackageControllerTests
    {
        private readonly IPackagePoliceService _packagePoliceService;
        private readonly IMapper _mapper;

        public PolicyPackageControllerTests()
        {
            _packagePoliceService = A.Fake<IPackagePoliceService>();
            _mapper = A.Fake<IMapper>();
        }

        [Fact]
        public async Task PolicyPackageController_GetAllPolicyPackages_ReturnOK()
        {

            var allPackages = A.Fake<List<PolicyPackageDomain>>();
            A.CallTo(() => _packagePoliceService.GetAllPolicyPackagesAsync()).Returns(Task.FromResult(allPackages));
            var controller = new PolicyPackageController(_packagePoliceService);


            var result = await controller.GetAllPolicyPackages();


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }

        [Fact]
        public async Task PolicyPackageController_GetPolicyPackageById_ReturnOK()
        {

            var packageId = 1;
            var package = A.Fake<PolicyPackageDomain>();
            A.CallTo(() => _packagePoliceService.GetPolicyPackageByIdAsync(packageId)).Returns(Task.FromResult(package));
            var controller = new PolicyPackageController(_packagePoliceService);


            var result = await controller.GetPolicyPackageById(packageId);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }
        [Fact]
        public async Task PolicyPackageController_GetPolicyPackageById_ReturnBadRequest()
        {

            var packageId = -1;
            var package = A.Fake<PolicyPackageDomain>();
            A.CallTo(() => _packagePoliceService.GetPolicyPackageByIdAsync(packageId)).Returns(Task.FromResult(package));
            var controller = new PolicyPackageController(_packagePoliceService);


            var result = await controller.GetPolicyPackageById(packageId);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(BadRequestResult));
        }
        [Fact]
        public async Task PolicyPackageController_CreateNewPackage_ReturnOk()
        {

            var packageCreateDTO = A.Fake<PackagePolicyCreateDTO>();
            A.CallTo(() => _packagePoliceService.CreateNewPackage(packageCreateDTO)).Returns(Task.FromResult(true));
            var controller = new PolicyPackageController(_packagePoliceService);


            var result = await controller.CreateNewPackage(packageCreateDTO);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }
        [Fact]
        public async Task PolicyPackageController_CreateNewPackage_ReturnBadRequest()
        {

            PackagePolicyCreateDTO packageCreateDTO =null;
            A.CallTo(() => _packagePoliceService.CreateNewPackage(packageCreateDTO)).Returns(Task.FromResult(true));
            var controller = new PolicyPackageController(_packagePoliceService);


            var result = await controller.CreateNewPackage(packageCreateDTO);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(BadRequestResult));
        }
        [Fact]
        public async Task PolicyPackageController_EditPackage_ReturnOk()
        {

            var packageEditDTO = A.Fake<PackagePolicyEditDTO>();
            A.CallTo(() => _packagePoliceService.EditPackage(packageEditDTO)).Returns(Task.FromResult(true));
            var controller = new PolicyPackageController(_packagePoliceService);


            var result = await controller.EditPackage(packageEditDTO);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }
        [Fact]
        public async Task PolicyPackageController_EditPackage_ReturnBadRequest()
        {

            PackagePolicyEditDTO packageEditDTO = null;
            A.CallTo(() => _packagePoliceService.EditPackage(packageEditDTO)).Returns(Task.FromResult(true));
            var controller = new PolicyPackageController(_packagePoliceService);


            var result = await controller.EditPackage(packageEditDTO);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(BadRequestResult));
        }
        [Fact]
        public async Task PolicyPackageController_InActivePackage_ReturnOk()
        {

            var packageId = 1;
            A.CallTo(() => _packagePoliceService.InActivePackage(packageId)).Returns(Task.FromResult(true));
            var controller = new PolicyPackageController(_packagePoliceService);


            var result = await controller.InActivePackage(packageId);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }
        [Fact]
        public async Task PolicyPackageController_InActivePackage_ReturnBadRequest()
        {

            var packageId = -1;
            A.CallTo(() => _packagePoliceService.InActivePackage(packageId)).Returns(Task.FromResult(true));
            var controller = new PolicyPackageController(_packagePoliceService);


            var result = await controller.InActivePackage(packageId);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(BadRequestResult));
        }
        [Fact]
        public async Task PolicyPackageController_ActivePackage_ReturnOk()
        {

            var packageId = 1;
            A.CallTo(() => _packagePoliceService.ActivePackage(packageId)).Returns(Task.FromResult(true));
            var controller = new PolicyPackageController(_packagePoliceService);


            var result = await controller.ActivePackage(packageId);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }
        [Fact]
        public async Task PolicyPackageController_ActivePackage_ReturnsBadRequest()
        {

            var packageId = -1;
            A.CallTo(() => _packagePoliceService.ActivePackage(packageId)).Returns(Task.FromResult(true));
            var controller = new PolicyPackageController(_packagePoliceService);


            var result = await controller.ActivePackage(packageId);


            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(BadRequestResult));
        }
    }
}
