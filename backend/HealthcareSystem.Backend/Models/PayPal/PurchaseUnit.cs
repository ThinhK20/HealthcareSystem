namespace HealthcareSystem.Backend.Models.PayPal
{
    public class PurchaseUnit
    {
        public List<ItemPayPal> items { get; set; }
        public AmountPayPal amount { get; set; }
    }
}
