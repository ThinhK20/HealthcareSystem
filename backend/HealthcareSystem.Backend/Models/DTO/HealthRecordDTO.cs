using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HealthcareSystem.Backend.Models.DTO
{
    public class HealthRecordDTO
    {
        
        public int UserID { get; set; }
        
        public string? Description { get; set; }

        public DateTime? RecordDate { get; set; }

        public int FeeAffectID { get; set; }
    }
}
