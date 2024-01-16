using HealthcareSystem.Backend.Models.Entity;

namespace HealthcareSystem.Backend.Models.Domain
{
    public class InsuranceDetailDomainWithoutFKInsurance
    {
        public int? PackageID { get; set; }
        public int? InsureID { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }

        public PolicyPackageDomainWithoutFK? PolicyPackage { get; set; }

    }
}
