using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VolunteerWing.Models
{
    public class CreateGroupRequest
    {
        public string GroupName { get; set; }
        public int AdminId { get; set; }
    }
}
