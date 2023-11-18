using AutoMapper;

namespace HealthcareSystem.Backend
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Models.Domain.CustomerRequest, Models.Entity.CustomerRequest>().ReverseMap();
        }
    }
}
