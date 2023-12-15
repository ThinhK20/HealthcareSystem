namespace HealthcareSystem.Backend.Models.Domain
{
    public class PayPalCheckDomain
    {
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public DateTime? ExpirationPaypal { get; set; }

        public double? Price { get; set; }
        public bool? Status { get; set; }
        public string? LinkCheckOut { get; set; }
        public bool? PaypalEmail { get; set; }
        public string? idPayPal { get; set; }
        
    }
}
