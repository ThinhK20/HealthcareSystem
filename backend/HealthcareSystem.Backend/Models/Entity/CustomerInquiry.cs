using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthcareSystem.Backend.Models.Entity
{
    public class CustomerInquiry
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int InquiryID { get; set; }
        public int AccountId { get; set; }
        public int Questioner { get; set; }
        public int Respondent { get; set; }
        public DateTime DateQuestion { get; set; }
        public DateTime DateAnwser { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public string Status { get; set; }
        public virtual Account Account { get; set; }

    }
}