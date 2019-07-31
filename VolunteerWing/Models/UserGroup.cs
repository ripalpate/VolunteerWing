using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VolunteerWing.Models
{
    public class UserGroup
    {
        public int Id { get; set; }
        public string UserEmail { get; set; }
        public int GroupId { get; set; }

    }
}
