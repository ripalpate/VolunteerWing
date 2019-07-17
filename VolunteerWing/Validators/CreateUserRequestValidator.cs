﻿using VolunteerWing.Models;

namespace VolunteerWing.Validators
{
    public class CreateUserRequestValidator
    {
        public bool Validate(CreateUserRequest requestToValidate)
        {
            return (string.IsNullOrEmpty(requestToValidate.Email)
                   || string.IsNullOrEmpty(requestToValidate.FirebaseId)
                   || string.IsNullOrEmpty(requestToValidate.Name)
                   || string.IsNullOrEmpty(requestToValidate.Street)
                   || string.IsNullOrEmpty(requestToValidate.City)
                   || string.IsNullOrEmpty(requestToValidate.State)
                   || string.IsNullOrEmpty(requestToValidate.ZipCode)
                   || string.IsNullOrEmpty(requestToValidate.PhoneNumber)
                   || string.IsNullOrEmpty(requestToValidate.Age.ToString())
                   );
        }
    }
}
