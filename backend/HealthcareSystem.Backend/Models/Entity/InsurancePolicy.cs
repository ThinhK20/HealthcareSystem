using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthcareSystem.Backend.Models.Entity
{
    public class InsurancePolicy
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PolicyID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double PayoutPercentage { get; set; }
        public double MaxRefund { get; set; }

        public virtual ICollection<PackageDetail> PackageDetails { get; set; }
        public virtual RefundDetail RefundDetail { get; set; }
    }
}
