namespace HealthcareSystem.Backend.Models.PayPal
{
    public class DataOrder
    {
        public int id_book { get; set; }
        public string name { get; set; }
        public string quantity { get; set; }
        public UnitAmount unit_amount { get; set; }

    }
}
