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
            CreateMap<Models.Domain.CustomerRequestDomain, Models.Entity.CustomerRequest>()
                .ForMember(dest => dest.Account, opt => opt.Ignore())
                .ForMember(dest => dest.Staff, opt => opt.Ignore())
                .ForMember(dest => dest.Payment, opt => opt.Ignore());

            CreateMap<Models.Entity.CustomerRequest, Models.Domain.CustomerRequestDomain>();

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

            CreateMap<User, UserPriceDomain>();

            CreateMap<BasicPrice, BasicPriceDomain>();

            CreateMap<FeeAffect, FeeAffectDomain>();





        }
    }
}
