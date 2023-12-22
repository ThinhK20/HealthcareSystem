using HealthcareSystem.Backend.Models.Entity;

namespace HealthcareSystem.Backend.Models.Domain
{
    public class PackageDetailDomain
    {
        public double? PayoutPrice { get; set; }
        public double? MaxRefundPerExamination { get; set; }

        public double? MaxRefundPerDay { get; set; }

        public double? MaxRefundPeYear { get; set; }
    }
}
