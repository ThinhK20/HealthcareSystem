namespace HealthcareSystem.Backend.Models.PayPal
{
    public class CreateOrderReturn
    {
        public string id { get; set; }
        public string status { get; set; }
        public List<CreateOrderLinkReturn> links { get; set; }
    }
}
