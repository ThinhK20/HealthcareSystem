﻿namespace HealthcareSystem.Backend.Services.EmailService
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
