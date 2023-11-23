using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HealthcareSystem.Backend.Models.Domain
{
    public class BasicPriceDomain
    {
        public int PackageID { get; set; }
        public int IndexId { get; set; }
        public int? FromAge { get; set; }
        public int? ToAge { get; set; }

        public string? Gender { get; set; }

        public double? Price { get; set; }
    }
}
