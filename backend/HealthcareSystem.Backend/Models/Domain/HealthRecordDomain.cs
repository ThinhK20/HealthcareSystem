using HealthcareSystem.Backend.Models.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HealthcareSystem.Backend.Models.Domain
{
    public class HealthRecordDomain
    {

        
        public int UserID { get; set; }

        public int IndexRecord { get; set; }


        public string? Description { get; set; }

        public DateTime? RecordDate { get; set; }
        public int? Phase { get; set; }

        public int FeeAffectID { get; set; }

    }
}
