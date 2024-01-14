using FakeItEasy;
using FluentAssertions;
using HealthcareSystem.Backend.Controllers;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories.ImageRepository;
using Microsoft.AspNetCore.Mvc;

namespace backend.Tests.Controllers;

public class FileControllerTests
{
    private readonly IFileRepository _fileRepository;
    public FileControllerTests()
    {
        _fileRepository = A.Fake<IFileRepository>();
    }

    public async Task FileController_UploadFile_ReturnOk()
    {
        FileUploadDTO fileUploadDto = A.Fake<FileUploadDTO>();
        string resultUrl = A.Fake<string>();
        A.CallTo(() => _fileRepository.UploadFileAsync(fileUploadDto)).Returns(Task.FromResult(resultUrl));
        
        // Act
        var controller = new FileController(_fileRepository);
        var result = await controller.UploadFile(fileUploadDto);
        
        // Assert
        resultUrl.Should().NotBeNull();
        result.Should().NotBeNull();
        result.Should().BeOfType(typeof(OkObjectResult));
    }
    
}