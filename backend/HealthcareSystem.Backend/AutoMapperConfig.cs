using AutoMapper;
using HealthcareSystem.Backend.Controllers;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;

namespace HealthcareSystem.Backend
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Models.Domain.CustomerRequest, Models.Entity.CustomerRequest>().ReverseMap();




            CreateMap<InsurancePolicy, InsuarancePolicyDTO>()
                .ForMember(dest => dest.PayoutPercentage, opt => opt.MapFrom(src => src.PayoutPercentage))
                .ForMember(dest => dest.MaxRefund, opt => opt.MapFrom(src => src.MaxRefund))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.PolicyID, opt => opt.MapFrom(src => src.PolicyID))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));


            CreateMap<InsurancePolicy, InsuarancePolicyCreateDTO>()
                .ForMember(dest => dest.PayoutPercentage, opt => opt.MapFrom(src => src.PayoutPercentage))
                .ForMember(dest => dest.MaxRefund, opt => opt.MapFrom(src => src.MaxRefund))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));


            CreateMap<InsuarancePolicyCreateDTO, InsurancePolicy>();

            CreateMap<InsuarancePolicyUpdateDTO, InsurancePolicy>().ReverseMap();






        }
    }
}
