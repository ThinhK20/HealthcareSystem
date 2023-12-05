using HealthcareSystem.Backend.Models.DTO;

namespace HealthcareSystem.Backend.Repositories.ImageRepository
{
    public interface IFileRepository
    {
        public Task<string> UploadFileAsync(FileUploadDTO uploadedFile);
    }
}
