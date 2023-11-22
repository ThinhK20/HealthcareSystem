using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthcareSystem.Backend.Models.Entity
{
    public class FeeAffect
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FeeAffectId { get; set; }
        public string? FeeAffectName { get; set;}
        public double? PercentIncreaseInFirst { get; set; }
        public double? PercentIncreaseInNext { get; set; }
        public double? MaxPercentIncrease {  get; set; }
        public virtual ICollection<HealthRecord> HealthRecords { get; set; }
    }
}
