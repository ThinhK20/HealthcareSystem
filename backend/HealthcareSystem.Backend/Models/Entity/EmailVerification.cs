using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HealthcareSystem.Backend.Models.Entity
{
    public class EmailVerification
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int VerifyNumber { get; set; }

        public int ? AccountId { get; set; }

        public virtual Account account { get; set; }

    }
}
