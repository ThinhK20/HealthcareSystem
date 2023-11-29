using HealthcareSystem.Backend;
using HealthcareSystem.Backend.Data;
using HealthcareSystem.Backend.Repositories;
using HealthcareSystem.Backend.Repositories.ImageRepository;
using HealthcareSystem.Backend.Repositories.InsuranceDetailRepository;
using HealthcareSystem.Backend.Repositories.PolicyPackageRepository;
using HealthcareSystem.Backend.Repositories.RefundRequestRepository;
using HealthcareSystem.Backend.Services.InsuranceDetalService;
using HealthcareSystem.Backend.Services.PackagePoliceService;
using HealthcareSystem.Backend.Services.PaymentService;
using HealthcareSystem.Backend.Services.RefundRequestService;
using HealthcareSystem.Backend.Services.UserService;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAutoMapper(typeof(AutoMapperConfig));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("LocalMSSQL")!);
});



// Add repositories
builder.Services.AddScoped<ICustomerRequestRepository, CustomerRequestRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IInsurancePolicyRepository, InsurancePolicyRepository>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IHealthRecordRepository, HealRecordRepository>();
builder.Services.AddScoped<IFeeAffectRepository, FeeAffectRopsitory>();
builder.Services.AddScoped<IInsuranceDetailRepository, InsuranceDetailRepository>();
builder.Services.AddScoped<IBasicPriceRepository, BasicPriceRepository>();
builder.Services.AddScoped<IPolicyPackageRepository, PolicyPackageRepository>();
builder.Services.AddScoped<IFileRepository, FileRepository>();
builder.Services.AddScoped<IRefundRequestRepository, RefundRequestRepository>();


// Add services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IPackagePoliceService, PackagePoliceService>();
builder.Services.AddScoped<IInsuranceDetailService, InsuranceDetailService>();
builder.Services.AddScoped<IRefundRequestService, RefundRequestService>();




builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    });


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowOrigin");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
