using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VolunteerWing.Models;

namespace VolunteerWing.Validators
{
    public class CreateGroupRequestValidator
    {
        public bool Validate(CreateGroupRequest requestToValidate)
        {
            return (string.IsNullOrEmpty(requestToValidate.GroupName));
        }
    }
}
