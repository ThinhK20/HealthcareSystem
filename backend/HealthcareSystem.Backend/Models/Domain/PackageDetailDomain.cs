using HealthcareSystem.Backend.Models.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HealthcareSystem.Backend.Models.Domain
{
    public class PackageDetailDomain
    {
        public int PackageID { get; set; }
        public int PolicyID { get; set; }
        public double PayoutPrice { get; set; }
        public double MaxRefundPerExamination { get; set; }

        public double MaxRefundPerDay { get; set; }

        public double MaxRefundPeYear { get; set; }
        public PolicyPackageDomain PolicyPackage { get; set; } = new PolicyPackageDomain();
        public InsurancePolicyDomain InsurancePolicy { get; set; } = new InsurancePolicyDomain();
    }
}
