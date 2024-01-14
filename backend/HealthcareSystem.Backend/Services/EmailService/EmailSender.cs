using System.Net;
using System.Net.Mail;

namespace HealthcareSystem.Backend.Services.EmailService
{
    public class EmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string message)
        {
            var mail = "tainguyensanh@gmail.com";
            var pw = "########";

            var client = new SmtpClient("smtp-mail.outlook.com", 587)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(mail, pw)
            };

            return client.SendMailAsync(new MailMessage(from: mail, to: email, subject, message));
        }
    }
}
