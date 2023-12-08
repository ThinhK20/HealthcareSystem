using HealthcareSystem.Backend.Models.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Insurance
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int InsuranceID { get; set; }

    public string RegisterPlace { get; set; }

    public string CardOpenDate { get; set; }

    public string AccountId { get; set; }

    public virtual Account Account { get; set; }
    public virtual ICollection<InsuranceDetail>? InsuranceDetails { get; set; }
    public virtual ICollection<RefundRequest>? RefundRequests { get; set; }
}