namespace HealthcareSystem.Backend.Models.DTO
{
    public class PackageDetailCreateDTO
    {
        public int PolicyId { get; set; }
        public double PayoutPrice {  get; set; }
        public double? MaxRefundPerExamination { get; set; }
        public double? MaxRefundPerDay { get; set; }
        public double? MaxRefundPerYear { get; set; }
    }
}