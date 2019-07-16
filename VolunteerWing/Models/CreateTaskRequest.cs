using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VolunteerWing.Models
{
    public class CreateTaskRequest
    {
        public string TaskName { get; set; }
        public string Comment { get; set; }
        public int NumberOfPeopleNeed { get; set; }
        public int NumberOfPeopleSignUp { get; set; }
        public int EventId { get; set; }
        public bool IsDeleted { get; set; }
    }
}
