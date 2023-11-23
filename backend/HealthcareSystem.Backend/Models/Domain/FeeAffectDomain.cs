namespace HealthcareSystem.Backend.Models.Domain
{
    public class FeeAffectDomain
    {
        public int FeeAffectId { get; set; }
        public string FeeAffectName { get; set; }
        public double PercentIncreaseInFirst { get; set; }
        public double PercentIncreaseInNext { get; set; }
        public double MaxPercentIncrease { get; set; }
    }
}
