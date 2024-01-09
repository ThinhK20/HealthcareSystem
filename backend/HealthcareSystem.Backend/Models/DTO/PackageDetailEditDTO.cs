namespace HealthcareSystem.Backend.Models.DTO
{
    public class PackageDetailEditDTO
    {
        public int PackageID { get; set; }
        public int PolicyId { get; set; }
        public double PayoutPrice { get; set; }
        public double? MaxRefundPerExamination { get; set; }
        public double? MaxRefundPerDay { get; set; }
        public double? MaxRefundPeYear { get; set; }
    }
}
