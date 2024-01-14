using AutoMapper;
using FakeItEasy;
using FluentAssertions;
using HealthcareSystem.Backend.Controllers;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace backend.Tests.Controllers;

public class InsurancePolicyControllerTests
{

    private readonly IInsurancePolicyRepository _dbIP;
    private readonly IMapper _mapper;

    public InsurancePolicyControllerTests()
    {
        _dbIP = A.Fake<IInsurancePolicyRepository>();
        _mapper = A.Fake<IMapper>();
    }

    [Fact]
    public async Task InsuranePolicyController_GetAllPolicy_ReturnOK()
    {
        // Arrange
        var fakePolicyList = new List<InsurancePolicy>();
        var mapper_data = new List<InsuarancePolicyDTO>();



        A.CallTo(() => _dbIP.GetAllAsync)
            .WithReturnType<List<InsurancePolicy>>()
            .Returns(fakePolicyList);

        A.CallTo(() => _mapper.Map<List<InsuarancePolicyDTO>>(fakePolicyList)).Returns(mapper_data);


        var controller = new InsuarancePolicyController(_dbIP, _mapper);
        // 
        var result = await controller.GetAllPolicy();

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }

    [Fact]
    public async Task InsuranePolicyController_GetPolicy_ReturnOK()
    {
        // Arrange

        var fakePolicy = new InsurancePolicy();
        var id = 1;
        var mapper_data = new InsuarancePolicyDTO();

        A.CallTo(() => _dbIP.GetAsync(u => u.PolicyID == id, true, null))
         .Returns(fakePolicy);


        A.CallTo(() => _mapper.Map<InsuarancePolicyDTO>(fakePolicy)).Returns(mapper_data);

        var controller = new InsuarancePolicyController(_dbIP, _mapper);

        // Act
        var result = await controller.GetOnePolicy(id);


        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));

    }



    [Fact]
    public async Task InsuranePolicyController_DeletePolicy_ReturnOK()
    {
        var fakePolicy = new InsurancePolicy();
        var id = 1;

        A.CallTo(() => _dbIP.GetAsync(u => u.PolicyID == id, true, null))
         .Returns(fakePolicy);

        A.CallTo(() => _dbIP.RemoveAsync(fakePolicy)).Returns(Task.CompletedTask);


        var controller = new InsuarancePolicyController(_dbIP, _mapper);

        // Act
        var result = await controller.DeletePolicy(id);


        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));

    }


    //[Fact]
    //public async Task InsuranePolicyController_UpdatePolicy_ReturnOK()
    //{
    //    var fakePolicy = new InsurancePolicy();
    //    var id = 1;
    //    var mapper_data = new InsurancePolicy();

    //    A.CallTo(() => _dbIP.GetAsync(u => u.PolicyID == id, true, null))
    //     .Returns(fakePolicy);


    //    A.CallTo(() => _mapper.Map<InsuarancePolicyDTO>(fakePolicy)).Returns(mapper_data);


    //    A.CallTo(() => _dbIP.RemoveAsync(fakePolicy)).Returns(Task.CompletedTask);


    //    var controller = new InsuarancePolicyController(_dbIP, _mapper);

    //    // Act
    //    var result = await controller.DeletePolicy(id);


    //    result.Should().NotBeNull();
    //    result.Should().BeOfType(typeof(OkObjectResult));
    //}

}