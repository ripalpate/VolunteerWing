using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VolunteerWing.Models
{
    public class CreateInvitationRequest
    {
        public string UserEmail { get; set; }
        public int EventId { get; set; }
        public string Link { get; set; }
    }
}
