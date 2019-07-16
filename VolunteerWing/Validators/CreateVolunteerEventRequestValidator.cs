using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VolunteerWing.Models;

namespace VolunteerWing.Validators
{
    public class CreateVolunteerEventRequestValidator
    {
        public bool Validate(CreateVolunteerEventRequest requestToValidate)
        {
            return (string.IsNullOrEmpty(requestToValidate.EventName)
                   || string.IsNullOrEmpty(requestToValidate.StartDate.ToString())
                   || string.IsNullOrEmpty(requestToValidate.StartTime.ToString())
                   || string.IsNullOrEmpty(requestToValidate.EndTime.ToString())
                   || string.IsNullOrEmpty(requestToValidate.AdminId.ToString())
                   );
        }
    }
}
