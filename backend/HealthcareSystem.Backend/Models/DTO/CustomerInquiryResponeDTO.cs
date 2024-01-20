namespace HealthcareSystem.Backend.Models.DTO
{
    public class CustomerInquiryResponeDTO
    {
        public int InquiryID { get; set; }
        public string? FullName { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }

        public DateTime? DateQuestion { get; set; }
        public DateTime? DateAnwser { get; set; }
        public string? Question { get; set; }
        public string? Status { get; set; }

        public string? StaffName { get; set; }
    }
}
