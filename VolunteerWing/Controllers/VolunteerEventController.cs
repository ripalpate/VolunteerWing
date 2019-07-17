using Microsoft.AspNetCore.Mvc;
using VolunteerWing.Data;
using VolunteerWing.Models;
using VolunteerWing.Validators;

namespace VolunteerWing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VolunteerEventController : ControllerBase
    {
        readonly VolunteerEventRepository _repository;
        readonly CreateVolunteerEventRequestValidator _validator;

        public VolunteerEventController(VolunteerEventRepository repository)
        {
            _repository = repository;
            _validator = new CreateVolunteerEventRequestValidator();
        }

        [HttpPost]
        public ActionResult AddVolunteerEvent(CreateVolunteerEventRequest createRequest)
        {
            if (_validator.Validate(createRequest))
            {
                return BadRequest(new { error = "please enter all fields" });
            }

            var newVolunteerEvent = _repository.AddVolunteerEvent(createRequest.EventName, createRequest.Description, createRequest.Location, createRequest.StartDate, createRequest.StartTime, createRequest.EndTime, createRequest.AdminId);

            return Created($"api/volunteerEvent/{newVolunteerEvent.Id}", newVolunteerEvent);
        }

        [HttpGet]
        public ActionResult GetAllVolunteerEvents()
        {
            var getAllVolunteerEvents = _repository.GetAllVolunteeerEvent();
            return Ok(getAllVolunteerEvents);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleVolunteerEvent(int id)
        {
            var getSingleVolunteerEvent = _repository.GetSingleVolunteerEvent(id);
            return Ok(getSingleVolunteerEvent);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateVolunteerEvent(int id, VolunteerEvent volunteerEventToUpdate)
        {
            if (id != volunteerEventToUpdate.Id)
            {
                return BadRequest();
            }

            var updateEvent = _repository.UpdateVolunteerEvent(volunteerEventToUpdate);
            return Ok(updateEvent);
        }

        [HttpDelete("{id}")]
        public ActionResult deleteVolunteerEvent(int id)
        {
            _repository.DeleteVolunteerEvent(id);
            return Ok("Event is deleted.");
        }
    }
}