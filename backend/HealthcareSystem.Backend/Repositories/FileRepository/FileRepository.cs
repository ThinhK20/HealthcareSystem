using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;

namespace HealthcareSystem.Backend.Repositories.ImageRepository
{
    public class FileRepository : IFileRepository
    {
        private readonly IConfiguration _configuration;

        private FileSettings _fileSettings;
        private Cloudinary _cloudinary;
        public FileRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _fileSettings = _configuration.GetSection("FileSettings").Get<FileSettings>()!;
            var account = new CloudinaryDotNet.Account(_fileSettings.CloudName, _fileSettings.ApiKey, _fileSettings.ApiSecret);
            _cloudinary = new Cloudinary(account);
        }


        public async Task<string> UploadFileAsync(FileUploadDTO uploadedFile)
        {
            try
            {
                var file = uploadedFile.File;
                var uploadResult = new RawUploadResult();
                if (file.Length > 0)
                {
                    using (var stream = file.OpenReadStream())
                    {
                        var uploadParams = new RawUploadParams()
                        {
                            File = new FileDescription(file.Name, stream),
                        };
                        uploadResult = await _cloudinary.UploadAsync(uploadParams);
                    }
                }
                return uploadResult.Url.ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
