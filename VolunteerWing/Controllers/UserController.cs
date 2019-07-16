using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VolunteerWing.Data;
using VolunteerWing.Models;
using VolunteerWing.Validators;

namespace VolunteerWing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        readonly UserRepository _repository;
        readonly CreateUserRequestValidator _validator;

        public UserController(UserRepository repository)
        {
            _repository = repository;
            _validator = new CreateUserRequestValidator();
        }

        [HttpPost]
        public ActionResult AddUser(CreateUserRequest createRequest)
        {
            if (_validator.Validate(createRequest))
            {
                return BadRequest(new { error = "please enter all fields" });
            }

            var newUser = _repository.AddUser(createRequest.Email, createRequest.FirebaseId, createRequest.Name,
                createRequest.Street, createRequest.City, createRequest.State, createRequest.ZipCode,
                createRequest.PhoneNumber, createRequest.Age, createRequest.IsAdmin);

            return Created($"api/users/{newUser.Id}", newUser);
        }
        [HttpGet]
        public ActionResult GetAllUsers()
        {
            var getAllUsers = _repository.GetAllUsers();
            return Ok(getAllUsers);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleUser(int id)
        {
            var getSingleUser = _repository.GetSingleUser(id);
            return Ok(getSingleUser);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateUser(int id, User userToUpdate)
        {
            if (id != userToUpdate.Id)
            {
                return BadRequest();
            }

            var updateUser = _repository.UpdateUser(userToUpdate);
            return Ok(updateUser);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteUser(int id)
        {
            _repository.DeleteUser(id);
            return Ok("isActive status is changed. User got deleted");
        }
    }
}