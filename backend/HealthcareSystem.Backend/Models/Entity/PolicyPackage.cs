using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthcareSystem.Backend.Models.Entity
{
    public class PolicyPackage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Packageid { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual ICollection<InsuranceDetail> InsuranceDetails { get; set; }
        public virtual ICollection<CustomerRequest> CustomerRequests { get; set; }
        public virtual ICollection<PackageDetail> PackageDetails { get; set; }
    }
}
