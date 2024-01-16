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



        A.CallTo(() => _dbIP.GetAllAsync(null, true, null, 100, 1))
            .Returns(fakePolicyList);

        A.CallTo(() => _mapper.Map<List<InsuarancePolicyDTO>>(fakePolicyList)).Returns(mapper_data);


        var controller = new InsuarancePolicyController(_dbIP, _mapper);
        // 
        var result = await controller.GetAllPolicy();

        // Assert

        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(ActionResult<IEnumerable<InsuarancePolicyDTO>>));

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
        result.Should().BeOfType(typeof(ActionResult<InsuarancePolicyDTO>));

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


    [Fact]
    public async Task InsuranePolicyController_UpdatePolicy_ReturnOK()
    {
        var fakePolicy = new InsurancePolicy();
        var id = 1;
        var mapper_data = new InsurancePolicy();
        InsuarancePolicyUpdateDTO policy = A.Fake<InsuarancePolicyUpdateDTO>();
        InsuarancePolicyUpdateDTO policyUpdate = new InsuarancePolicyUpdateDTO
        {
            PolicyID = policy.PolicyID,
            Name = policy.Name,
            Description = policy.Description,

        };

        A.CallTo(() => _dbIP.GetAsync(u => u.PolicyID == id, true, null))
         .Returns(fakePolicy);


        A.CallTo(() => _mapper.Map<InsurancePolicy>(policyUpdate)).Returns(mapper_data);


        A.CallTo(() => _dbIP.UpdateAsync(mapper_data)).Returns(Task.CompletedTask);


        var controller = new InsuarancePolicyController(_dbIP, _mapper);

        // Act
        var result = await controller.UpdatePolicy(policyUpdate);


        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(ActionResult<InsuarancePolicyUpdateDTO>));
    }


    [Fact]
    public async Task InsuranePolicyController_CreatePolicy_ReturnOK()
    {
        var fakePolicy = new InsurancePolicy();
        int id = 0;
        var mapper_data = new InsurancePolicy();
        var api = new InsuarancePolicyCreateDTO();


        InsuarancePolicyCreateDTO policy = A.Fake<InsuarancePolicyCreateDTO>();
        InsuarancePolicyCreateDTO policyUpdate = new InsuarancePolicyCreateDTO
        {
            Name = policy.Name,
            Description = policy.Description,

        };

   

        A.CallTo(() => _dbIP.GetLength())
         .Returns(id);

        id = id + 1;

        InsurancePolicy model = new()
        {

            Description = policyUpdate.Description,
            Name = policyUpdate.Name,
        };


        A.CallTo(() => _dbIP.CreateAsync(model)).Returns(Task.CompletedTask);

        A.CallTo(() => _mapper.Map<InsuarancePolicyCreateDTO>(model)).Returns(api);


        var controller = new InsuarancePolicyController(_dbIP, _mapper);

        // Act
        var result = await controller.CreatePolicy(policyUpdate);


        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(ActionResult<InsuarancePolicyCreateDTO>));
    }

}