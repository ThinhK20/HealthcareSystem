using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Repositories.ImageRepository;
using Microsoft.AspNetCore.Mvc;

namespace HealthcareSystem.Backend.Controllers
{
    [Route("api/images")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IFileRepository _fileRepository;

        public ImageController(IFileRepository fileRepository)
        {
            _fileRepository = fileRepository;
        }

        [HttpPost("upload")]
        public async Task<ActionResult<string>> UploadImage([FromForm] FileUploadDTO fileUploadDTO)
        {
            try
            {
                string resultUrl = await _fileRepository.UploadFileAsync(fileUploadDTO);
                return Ok(resultUrl);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
