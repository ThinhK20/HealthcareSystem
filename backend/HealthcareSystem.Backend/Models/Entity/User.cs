using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthcareSystem.Backend.Models.Entity
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        public string Fullname { get; set; }

        public string Email { get; set; }

        public string CCCD { get; set; }

        public string Phone { get; set; }

        public string Birthdate { get; set; }

        public string Address { get; set; }
        public virtual Account Account { get; set; }

    }
}
