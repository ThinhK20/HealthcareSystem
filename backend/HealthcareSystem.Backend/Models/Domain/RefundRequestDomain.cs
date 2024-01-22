namespace HealthcareSystem.Backend.Models.Domain
{
    public class RefundRequestDomain
    {
        public RefundRequestDomain()
        {
            RefundDetails = new();
            Insurance = new();
        }
        public int RefundID { get; set; }
        public int? InsureId { get; set; }
        public DateTime? DateSend { get; set; }
        public DateTime? DateRefund { get; set; }
        public string? Status { get; set; }
        public string? HoptitalName { get; set; }
        public string? FileUrl { get; set; }
        public string? Description { get; set; }
        public double? TotalRefundFee { get; set; }
        public List<RefundDetailDomain>? RefundDetails { get; set; }
        public Insurance? Insurance { get; set; }
    }
}
