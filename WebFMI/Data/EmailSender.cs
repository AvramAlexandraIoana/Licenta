using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using WebFMI.Models;

namespace WebFMI.Data
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailSettings _emailSettings;
        private readonly IHostingEnvironment _env;

        public EmailSender(
            IOptions<EmailSettings> emailSettings,
            IHostingEnvironment env)
        {
            _emailSettings = emailSettings.Value;
            _env = env;
        }

        // Use our configuration to send the email by using SmtpClient
        public  Task SendEmailAsync(string email, string subject, string body)
        {

            MailMessage message = new MailMessage();
            message.Subject = "Request from " + " to add a new supplier";
            message.IsBodyHtml = true;
            // message.Body = "Body containing <strong>HTML</strong>";
            var body1 = new StringBuilder();
            body1.AppendFormat("Hello, {0}\n", email);
            body1.AppendLine(@"Your KAUH Account about to activate click 
                     the link below to complete the actination process");
            body1.AppendLine("<a href=\"https://codepen.io/avramalexandraioana/pen/ExVgvWd\" > login</a>");
            message.Body = body1.ToString();

            message.To.Add(email);
            message.From = new MailAddress(_emailSettings.UserName);

            var client = new SmtpClient(_emailSettings.Host, _emailSettings.Port)
            {
                Credentials = new NetworkCredential(_emailSettings.UserName, _emailSettings.Password),
                EnableSsl = true
            };
          


            return  client.SendMailAsync(message);

        }
    }
}
