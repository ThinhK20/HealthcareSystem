using HealthcareSystem.Backend.Models.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Account
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int AccountId { get; set; }
    public int UserId { get; set; }

    public string Username { get; set; }

    public string Password { get; set; }

    public string Status { get; set; }

    public string Role { get; set; }

    public virtual User User { get; set; }
    public virtual ICollection<CustomerInquiry> CustomerInquiries { get; set; }
    public virtual ICollection<HealthRecord> HealthRecords { get; set; }
    public virtual ICollection<CustomerRequest> CustomerRequests { get; set; }
    public virtual ICollection<CustomerRequest> ApproverRequests { get; set; }
    public virtual Insurance Insurance { get; set; }
}