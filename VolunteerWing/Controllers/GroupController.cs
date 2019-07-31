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
    public class GroupController : ControllerBase
    {
        readonly GroupRepository _repository;
        readonly CreateGroupRequestValidator _validator;

        public GroupController(GroupRepository repository)
        {
            _repository = repository;
            _validator = new CreateGroupRequestValidator();
        }

        [HttpPost]
        public ActionResult AddGroup(CreateGroupRequest createRequest)
        {
            if (_validator.Validate(createRequest))
            {
                return BadRequest(new { error = "please enter all fields" });
            }

            var newGroup = _repository.AddGroup(createRequest.GroupName);

            return Created($"api/group/{newGroup.Id}", newGroup);
        }

        [HttpGet]
        public ActionResult GetAllGroups()
        {
            var getAllGroups = _repository.GetAllGroups();
            return Ok(getAllGroups);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleGroup(int id)
        {
            var getSingleGroup = _repository.GetSingleGroup(id);
            return Ok(getSingleGroup);
        }

        [HttpGet("groups/{id}")]
        public ActionResult GetAllGroupsByAdminId(int id)
        {
            var getAllGroupsByAdminId = _repository.GetAllGroupsByAdminId(id);
            return Ok(getAllGroupsByAdminId);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateGroup(int id, Group groupToUpdate)
        {
            if (id != groupToUpdate.Id)
            {
                return BadRequest();
            }

            var updateGroup = _repository.UpdateGroup(groupToUpdate);
            return Ok(updateGroup);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteGroup(int id)
        {
            _repository.DeleteGroup(id);
            return Ok("group got deleted");
        }
    }
}