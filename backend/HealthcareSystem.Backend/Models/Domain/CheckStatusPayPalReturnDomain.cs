namespace HealthcareSystem.Backend.Models.Domain
{
    public class CheckStatusPayPalReturnDomain
    {
        public string status {  get; set; }
        public string? LinkCheckOut { get; set; }
        public double? Price { get; set; }
        
    }
}
