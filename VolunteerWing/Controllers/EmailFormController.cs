using Microsoft.AspNetCore.Mvc;
using VolunteerWing.Models;
using VolunteerWing.ServiceWork;

namespace VolunteerWing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailFormController : ControllerBase
    {
        readonly EmailService _emailService;

        public EmailFormController(EmailService emailService)
        {
            _emailService = emailService;

        }
        [HttpPost]
        public ActionResult SendEmail(EmailForm emailForm)
        {
            _emailService.SendSimpleMessage(emailForm.From, emailForm.To, emailForm.Subject, emailForm.Body);

            return Ok("message sent");
        }
    }
}