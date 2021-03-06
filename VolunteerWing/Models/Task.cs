﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace VolunteerWing.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string TaskName { get; set; }
        public string Comment { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int NumberOfPeopleNeed { get; set; }
        public int NumberOfPeopleSignUp { get; set; }
        public int EventId { get; set; }
    }
}
