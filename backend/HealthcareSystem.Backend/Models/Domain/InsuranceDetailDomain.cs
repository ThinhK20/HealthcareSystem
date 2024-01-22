namespace HealthcareSystem.Backend.Models.Domain
{
   public class InsuranceDetailDomain
    {
        public int? PackageID { get; set; }
        public int? InsureID { get; set; }
        public DateTime? DateStart {  get; set; }
        public DateTime? DateEnd { get; set; }
        public string? Status { get; set; }
    }
}
