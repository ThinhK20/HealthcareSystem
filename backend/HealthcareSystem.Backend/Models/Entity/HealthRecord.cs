using HealthcareSystem.Backend.Models.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthcareSystem.Backend.Models.Entity
{
    public class HealthRecord
    {
        [Key]
        [Column(Order = 0)]
        public int UserID { get; set; }
        [Key]
        [Column(Order = 1)]
        public int IndexRecord { get; set; }
        [Key]
        [Column(Order = 2)]
        public int? Phase { get; set; }

        public string? Description { get; set; }

        public DateTime? RecordDate { get; set; }

        public int FeeAffectID { get; set; }

        public virtual User User { get; set; }

        public virtual FeeAffect FeeAffects { get; set; }
    }
}
