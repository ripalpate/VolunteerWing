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
    }
}