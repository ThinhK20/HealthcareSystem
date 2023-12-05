using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthcareSystem.Backend.Models.Entity
{
    public class Payment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PaymentId { get; set; }
        public int? RequestId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public DateTime? ExpirationPaypal { get; set; }

        public double? Price { get; set; }
        public bool? Status { get; set; }
        public string? LinkCheckOut { get; set; }
        public bool? PaypalEmail { get; set; }
        public string? idPayPal { get; set; }
        public virtual CustomerRequest? CustomerRequest { get; set; }

    }
}
