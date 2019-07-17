using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VolunteerWing.Models;

namespace VolunteerWing.Validators
{
    public class CreateTaskRequestValidator
    {
        public bool Validate(CreateTaskRequest requestToValidate)
        {
            return (string.IsNullOrEmpty(requestToValidate.TaskName)
                   || string.IsNullOrEmpty(requestToValidate.Comment)
                   || string.IsNullOrEmpty(requestToValidate.NumberOfPeopleNeed.ToString())
                   || string.IsNullOrEmpty(requestToValidate.NumberOfPeopleSignUp.ToString())
                   || string.IsNullOrEmpty(requestToValidate.EventId.ToString())
                   );
        }
    }
}
