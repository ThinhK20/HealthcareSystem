using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthcareSystem.Backend.Models.Entity
{
    public class RefundRequest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RefundID { get; set; }
        public int? InsureId { get; set; }
        public DateTime? DateSend { get; set; }
        public DateTime? DateRefund { get; set; }
        public string? Status { get; set; }
        public string? HoptitalName { get; set; }
        public string? HoptitalDescription { get; set; }
        public string? FileUrl { get; set; }
        public string? Description { get; set; }
        public double? TotalRefundFee { get; set; }
        public virtual ICollection<RefundDetail> RefundDetails { get; set; }
        public virtual Insurance Insurance { get; set; }
    }
}
