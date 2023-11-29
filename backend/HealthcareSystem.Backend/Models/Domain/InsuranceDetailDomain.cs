namespace HealthcareSystem.Backend.Models.Domain
{
   public class InsuranceDetailDomain
    {
        public int? PackagedID   { get; set; }
        public int? InsureID { get; set; }
        public DateTime? DateStart {  get; set; }
        public DateTime? DateEnd { get; set; }
    }
}
