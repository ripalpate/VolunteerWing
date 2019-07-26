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
    public class UserTaskController : ControllerBase
    {
        readonly UserTaskRepository _repository;

        public UserTaskController(UserTaskRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public ActionResult AddUserTask(CreateUserTaskRequest createRequest)
        {
            var newUserTask = _repository.AddUserTask(createRequest.UserId, createRequest.TaskId);

            return Created($"api/userTask/{newUserTask.Id}", newUserTask);
        }

        [HttpGet]
        public ActionResult GetAllUserTask()
        {
            var getAllUsersTasks = _repository.GetAllUsersTasks();
            return Ok(getAllUsersTasks);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleUserTask(int id)
        {
            var getSingleUserTask = _repository.GetSingleUserTask(id);
            return Ok(getSingleUserTask);
        }

        [HttpGet("event/{id}")]
        public ActionResult GetAllEventsThatUserSignup(int id)
        {
            var signupEvents = _repository.GetAllEventsThatUserSignup(id);
            return Ok(signupEvents);
        }


        [HttpPut("{id}")]
        public ActionResult UpdateUserTask(int id, UserTask userTaskToUpdate)
        {
            if (id != userTaskToUpdate.Id)
            {
                return BadRequest();
            }
            var updateUserTask = _repository.UpdateUserTask(userTaskToUpdate);
            return Ok(updateUserTask);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteUserTask(int id)
        {
            _repository.DeleteUserTask(id);
            return Ok("UserTask is deleted");
        }
    }
}