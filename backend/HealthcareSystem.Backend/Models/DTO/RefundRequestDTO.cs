namespace HealthcareSystem.Backend.Models.DTO
{
    public class RefundRequestDTO
    {
        public int? RefundID { get; set; }
        public int? InsureId { get; set; }
        public DateTime? DateSend { get; set; } = DateTime.Now;
        public DateTime? DateRefund { get; set; }
        public string? Status { get; set; }
        public string? HoptitalName { get; set; }
        public string? Description { get; set; }
        public IFormFile File { get; set; }
        public double? TotalRefundFee { get; set; }
    }
}
