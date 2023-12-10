namespace HealthcareSystem.Backend.Enums
{
    public static class AccountStatus
    {
        public static string Active { get; private set; } = "Active";
        public static string Inactive { get; private set; } = "Inactive";
        public static string Deleted { get; private set; } = "Deleted";

    }
}
