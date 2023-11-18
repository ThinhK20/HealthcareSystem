using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class HealthRecord
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int RecordId { get; set; }
    public int UserID { get; set; }

    public string Username { get; set; }

    public string Password { get; set; }

    public string Status { get; set; }

    public string Role { get; set; }


    public virtual Account Account { get; set; }
}

