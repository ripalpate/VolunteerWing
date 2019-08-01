using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VolunteerWing.Data;
using VolunteerWing.Models;

namespace VolunteerWing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserGroupController : ControllerBase
    {
        readonly UserGroupRepository _repository;

        public UserGroupController(UserGroupRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public ActionResult AddUserGroup(CreateUserGroupRequest createRequest)
        {
            var newUserGroup = _repository.AddUserGroup(createRequest.UserEmail, createRequest.GroupId);

            return Created($"api/userGroup/{newUserGroup.Id}", newUserGroup);
        }

        [HttpGet("emails/{id}")]
        public ActionResult GetAllUserEmailsByGroup(int id)
        {
            var getAllEmails = _repository.GetAllUserEmailsByGroup(id);
            return Ok(getAllEmails);
        }

        [HttpGet]
        public ActionResult GetAllUsersGroups()
        {
            var getAllUsersGroups = _repository.GetAllUsersGroups();
            return Ok(getAllUsersGroups);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleUserGroup(int id)
        {
            var getSingleUserGroup = _repository.GetSingleUserGroup(id);
            return Ok(getSingleUserGroup);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateGroup(int id, UserGroup userGroupToUpdate)
        {
            if (id != userGroupToUpdate.Id)
            {
                return BadRequest();
            }

            var updateUserGroup = _repository.UpdateUserGroup(userGroupToUpdate);
            return Ok(updateUserGroup);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteUserGroup(int id)
        {
            _repository.DeleteUserGroup(id);
            return Ok("userGroup is deleted");
        }
    }
}