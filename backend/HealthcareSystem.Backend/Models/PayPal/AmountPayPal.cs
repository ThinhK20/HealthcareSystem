namespace HealthcareSystem.Backend.Models.PayPal
{
    public class AmountPayPal
    {
        public string currency_code { get; set; }
        public string value { get; set; }
        public BreakdownPayPal breakdown { get; set; }
    }
}
