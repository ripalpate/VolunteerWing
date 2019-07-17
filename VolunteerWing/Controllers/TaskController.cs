using Microsoft.AspNetCore.Mvc;
using VolunteerWing.Data;
using VolunteerWing.Models;
using VolunteerWing.Validators;

namespace VolunteerWing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        readonly TaskRepository _repository;
        readonly CreateTaskRequestValidator _validator;

        public TaskController(TaskRepository repository)
        {
            _repository = repository;
            _validator = new CreateTaskRequestValidator();
        }

        [HttpPost]
        public ActionResult AddTasks(CreateTaskRequest createRequest)
        {
            if (_validator.Validate(createRequest))
            {
                return BadRequest(new { error = "please enter all fields" });
            }

            var newTask = _repository.AddTask(createRequest.TaskName, createRequest.Comment, createRequest.NumberOfPeopleNeed, createRequest.NumberOfPeopleSignUp, createRequest.EventId);

            return Created($"api/task/{newTask.Id}", newTask);
        }
    }
}