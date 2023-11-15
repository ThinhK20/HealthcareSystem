namespace HealthcareSystem.Backend.Infrastructure
{
    public static class Infrastructure
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            return services;
        }

        public static IServiceCollection AddPresentation(this IServiceCollection services)
        {
            return services;
        }

        public static IServiceCollection AddMicroservices(this IServiceCollection services, IConfiguration configuration)
        {
            return services;
        }

        public static IServiceCollection AddPolicies(this IServiceCollection services)
        {
            return services;
        }

        public static IServiceCollection AddAuthenticationAndAuthorization(this IServiceCollection services, IConfiguration configuration)
        {
            return services;
        }

    }
}
