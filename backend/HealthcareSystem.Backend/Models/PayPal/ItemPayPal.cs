namespace HealthcareSystem.Backend.Models.PayPal
{
    public class ItemPayPal
    {
        public string name {  get; set; }
        public string description { get; set; }
        public string quantity { get; set; }
        public UnitAmount amount { get; set; }
    }
}
