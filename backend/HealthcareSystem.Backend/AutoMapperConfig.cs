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
                 .ForMember(dest => dest.Payment, opt => opt.Ignore())
                 .ForMember(dest => dest.PolicyPackage, opt => opt.Ignore());
            CreateMap<Models.Domain.PaymentDomain, Models.Entity.Payment>()
                  .ForMember(dest => dest.CustomerRequest, opt => opt.Ignore());
            CreateMap<Models.Entity.CustomerRequest, Models.Domain.CustomerRequestDomain>();
            CreateMap<Models.DTO.CustomerRequestCreateDTO, Models.Entity.CustomerRequest>().ReverseMap();
            CreateMap<Payment, PaymentDomain>().ReverseMap();

            CreateMap<Models.Domain.CustomerRequestDomain, Models.DTO.CustomerRequestCreateDTO>().ReverseMap();
            CreateMap<Models.Domain.CustomerRequestDomain, Models.DTO.CustomerRequestCreateDTO>().ReverseMap();

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

            CreateMap<Insurance, InsuranceDomain>().ReverseMap();
            CreateMap<Insurance, InsuranceCreateDTO>().ReverseMap();


            CreateMap<Payment, PaymentDomain>();

            CreateMap<InsuranceDetail, InsuranceDetailDomain>();
            CreateMap<InsuranceDetailDomain, InsuranceDetail>();
            CreateMap<User, UserPriceDomain>();

            CreateMap<BasicPrice, BasicPriceDomain>();

            CreateMap<FeeAffect, FeeAffectDomain>();

            CreateMap<RefundRequestDTO, RefundRequest>().ReverseMap()
                .ForMember(x => x.File, opt => opt.Ignore());
            CreateMap<RefundRequestDomain, RefundRequest>().ReverseMap();
            CreateMap<CustomerRequest, CustomerRequestDTO>();

            CreateMap<Payment, PaymentDomain>()
                .ForMember(dest => dest.CustomerRequest, opt => opt.MapFrom(src => src.CustomerRequest));


            CreateMap<Models.Entity.Account, Models.Domain.Account>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Username))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password))
                .ForMember(dest => dest.AccountId, opt => opt.MapFrom(src => src.AccountId))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role));

            CreateMap<User, UserDomain>();

        }
    }
}
