using AutoMapper;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
using HealthcareSystem.Backend.Repositories.GenericRepository;
using HealthcareSystem.Backend.Services.InsuranceDetalService;
using HealthcareSystem.Backend.Services.PaymentService;

namespace HealthcareSystem.Backend.Repositories.EmailVerificationRepository
{
    public class EmailVerificationRepository : Repository<EmailVerification>, IEmailVerificationRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationContext;

        public EmailVerificationRepository(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _applicationContext = context;
        }

      
    }
}
