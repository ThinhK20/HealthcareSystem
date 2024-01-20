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

            CreateMap<Models.Domain.PackageDetailDomain, Models.Entity.PackageDetail>().ReverseMap();


            CreateMap<Models.Domain.PolicyPackageDomain, Models.Entity.PolicyPackage>().ReverseMap();
            CreateMap<Models.Domain.PolicyPackageDomainWithoutFK, Models.Entity.PolicyPackage>().ReverseMap();


            //CreateMap<Models.DTO.PackagePolicyCreateDTO, Models.Entity.PolicyPackage>().ReverseMap();
            CreateMap<Models.DTO.PackagePolicyEditDTO, Models.Entity.PolicyPackage>().ReverseMap();
            CreateMap<Models.DTO.BasicPriceEditDTO, Models.Entity.BasicPrice>().ReverseMap();
            CreateMap<Models.DTO.PackageDetailEditDTO, Models.Entity.PackageDetail>().ReverseMap();

            CreateMap<AccountBaseDTO, Models.Entity.Account>().ReverseMap();
            CreateMap<Models.Domain.Account, Models.DTO.AccountDTO>().ReverseMap();
            CreateMap<Models.Domain.Account, Models.Entity.Account>().ReverseMap();
            CreateMap<AccountGetDTO, Models.Entity.Account>().ReverseMap();
            CreateMap<Models.DTO.AccountDTO, Models.Entity.Account>().ReverseMap();

            CreateMap<InsurancePolicyDomain, InsurancePolicy>().ReverseMap();


            // Refund Details
            CreateMap<RefundDetailDomain, RefundDetail>().ReverseMap();
            CreateMap<CreateRefundDetailDTO, RefundDetailDomain>().ReverseMap();
            CreateMap<CustomerInquiryDTO, CustomerInquiry>().ReverseMap();

            CreateMap<CustomerInquiryResponeDTO, CustomerInquiry>()
                .ForMember(dest => dest.InquiryID, opt => opt.MapFrom(src => src.InquiryID))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.DateQuestion, opt => opt.MapFrom(src => src.DateQuestion))
                .ForMember(dest => dest.Question, opt => opt.MapFrom(src => src.Question))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
                .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.Phone))
                .ForPath(dest => dest.Account.User.Fullname, opt => opt.MapFrom(src => src.StaffName)).ReverseMap();

            CreateMap<InsurancePolicy, InsuarancePolicyDTO>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.PolicyID, opt => opt.MapFrom(src => src.PolicyID))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));


            CreateMap<InsurancePolicy, InsuarancePolicyCreateDTO>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));

            CreateMap<Payment, PayPalCheckDomain>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.ExpirationPaypal, opt => opt.MapFrom(src => src.ExpirationPaypal))
                .ForMember(dest => dest.idPayPal, opt => opt.MapFrom(src => src.idPayPal))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.CreatedDate))
                .ForMember(dest => dest.ExpirationDate, opt => opt.MapFrom(src => src.ExpirationDate))
                .ForMember(dest => dest.idPayPal, opt => opt.MapFrom(src => src.idPayPal))
                .ForMember(dest => dest.UpdatedDate, opt => opt.MapFrom(src => src.UpdatedDate))
                .ForMember(dest => dest.LinkCheckOut, opt => opt.MapFrom(src => src.LinkCheckOut));

            CreateMap<PaymentDomain, PaymentOfUserDTO>()
                .ForMember(dest => dest.PaymentId, opt => opt.MapFrom(src => src.PaymentId))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.ExpirationDate, opt => opt.MapFrom(src => src.ExpirationDate))
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.CreatedDate))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.RequestId, opt => opt.MapFrom(src => src.RequestId))
                .ForMember(dest => dest.Note, opt => opt.MapFrom(src => src.Note));

            CreateMap<InsuarancePolicyCreateDTO, InsurancePolicy>();


            CreateMap<InsuarancePolicyUpdateDTO, InsurancePolicy>().ReverseMap();

            CreateMap<Insurance, InsuranceDomain>().ReverseMap();
            CreateMap<Insurance, InsuranceDomainWithoutFK>().ReverseMap();

            CreateMap<Insurance, InsuranceCreateDTO>().ReverseMap();


            CreateMap<Payment, PaymentDomain>();

            CreateMap<InsuranceDetail, InsuranceDetailDomain>();
            CreateMap<InsuranceDetail, InsuranceDetailDomainWithoutFKInsurance>();

            CreateMap<InsuranceDetailDomain, InsuranceDetail>();
            CreateMap<User, UserPriceDomain>();
            CreateMap<User, UserDomain>();
            CreateMap<UserDTO, User>().ReverseMap();
            CreateMap<UserDomain, User>().ReverseMap(); ;
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

            CreateMap<Models.DTO.AccountDTO, Models.Entity.Account>()
               .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Username))
               .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password))
               .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
               .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role))
               .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId));


            CreateMap<Models.Entity.User, Models.DTO.UserDTO>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.Fullname, opt => opt.MapFrom(src => src.Fullname))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.CCCD, opt => opt.MapFrom(src => src.CCCD))
            .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.Phone))
            .ForMember(dest => dest.Birthdate, opt => opt.MapFrom(src => src.Birthdate))
            .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
             .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Gender));


        }
    }
}
