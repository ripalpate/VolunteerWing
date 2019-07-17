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

        [HttpGet]
        public ActionResult GetAllTasks()
        {
            var getAllTasks = _repository.GetAllTasks();
            return Ok(getAllTasks);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleTask(int id)
        {
            var getSingleTask = _repository.GetSingleTask(id);
            return Ok(getSingleTask);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateTask(int id, Task taskToUpdate)
        {
            if (id != taskToUpdate.Id)
            {
                return BadRequest();
            }
            var updateTask = _repository.UpdateTask(taskToUpdate);
            return Ok(updateTask);
        }

        [HttpDelete("{id}")]
        public ActionResult deleteTask(int id)
        {
            _repository.DeleteTask(id);
            return Ok("isDeleted status changed to 1.");
        }
    }
}