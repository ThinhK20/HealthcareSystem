using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthcareSystem.Backend.Models.Entity
{
    public class InsuranceDetail
    {
        [Key]
        [Column(Order = 0)]
        public int PackageID { get; set; }
        [Key]
        [Column(Order = 1)]
        public int InsureID { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }

        public virtual Insurance Insurance { get; set; }
        public virtual PolicyPackage PolicyPackage { get; set; }
    }
}
