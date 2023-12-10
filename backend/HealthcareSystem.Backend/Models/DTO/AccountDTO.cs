namespace HealthcareSystem.Backend.Models.DTO
{
    public class AccountDTO
    {
        public int AccountId { get; set; }
        public int UserId { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }


        public string Status { get; set; }
        public string EmailVerification { get; set; }

        public string Role { get; set; }
    }
    public class AccountBaseDTO
    {
        public int AccountId { get; set; }
        public int UserId { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }


        public string Status { get; set; }

        public string Role { get; set; }
    }
    public class PasswordDTO
    {
        public int AccountId { get; set; }
        public string Username { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
    public class AccountUserDTO
    {
        public int AccountId { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }


        public string Status { get; set; }

        public string Role { get; set; }

        public string Fullname { get; set; }

        public string Email { get; set; }

        public string CCCD { get; set; }

        public string Phone { get; set; }

        public string Birthdate { get; set; }

        public string Address { get; set; }

        public string Gender { get; set; }
    }
}
