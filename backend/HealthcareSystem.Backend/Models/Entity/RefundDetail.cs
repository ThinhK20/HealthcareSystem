using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthcareSystem.Backend.Models.Entity
{
    public class RefundDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RefundDetailID { get; set; }
        public int RefundID { get; set; }
        public int PolicyId { get; set; }
        public string Description { get; set; }
        public double RefundFee { get; set; }
        public virtual RefundRequest RefundRequest { get; set; }
        public virtual InsurancePolicy InsurancePolicy { get; set; }
    }
}
