using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HealthcareSystem.Backend.Models.Entity
{
    public class BasicPrice
    {
        [Key]
        [Column(Order = 0)]
        public int PackageID { get; set; }
        [Key]
        [Column(Order = 1)]
        public int IndexId { get; set; }
        public int? FromAge { get; set; }
        public int? ToAge { get; set; }

        public string? Gender { get; set; }

        public double? Price { get; set; }
        public virtual PolicyPackage PolicyPackage { get; set; }

    }
}
