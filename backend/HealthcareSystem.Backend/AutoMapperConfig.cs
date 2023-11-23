using AutoMapper;
using HealthcareSystem.Backend.Models.Domain;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
namespace HealthcareSystem.Backend
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Models.Domain.CustomerRequest, Models.Entity.CustomerRequest>().ReverseMap();

            CreateMap<Models.Domain.CustomerRequest, Models.DTO.CustomerRequestCreateDTO>().ReverseMap();
            CreateMap<Models.Domain.CustomerRequest, Models.DTO.CustomerRequestCreateDTO>().ReverseMap();

            CreateMap<Models.Domain.PolicyPackageDomain, Models.Entity.PolicyPackage>().ReverseMap();

            CreateMap<Models.Domain.Account, Models.DTO.AccountDTO>().ReverseMap();
            CreateMap<Models.Domain.Account, Models.Entity.Account>().ReverseMap();
            CreateMap<Models.DTO.AccountDTO, Models.Entity.Account>().ReverseMap();

            CreateMap<InsurancePolicy, InsuarancePolicyDTO>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.PolicyID, opt => opt.MapFrom(src => src.PolicyID))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));


            CreateMap<InsurancePolicy, InsuarancePolicyCreateDTO>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));


            CreateMap<InsuarancePolicyCreateDTO, InsurancePolicy>();

            CreateMap<InsuarancePolicyUpdateDTO, InsurancePolicy>().ReverseMap();


            CreateMap<Payment, PaymentDomain>();




        }
    }
}
