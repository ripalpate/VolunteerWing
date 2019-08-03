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
    public class InvitationController : ControllerBase
    {
        readonly InvitationRepository _repository;

        public InvitationController(InvitationRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public ActionResult AddInvitation(CreateInvitationRequest createRequest)
        {
            var newInvitation = _repository.AddInvitation(createRequest.UserEmail, createRequest.EventId, createRequest.Link);

            return Created($"api/invitation/{newInvitation.Id}", newInvitation);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleInvitation(int id)
        {
            var getInvitation = _repository.GetSingleInvitation(id);
            return Ok(getInvitation);
        }

        [HttpGet]
        public ActionResult GetAllInvitations()
        {
            var getAllInvitations = _repository.GetAllInvitations();
            return Ok(getAllInvitations);
        }

        [HttpGet("eventInfo")]
        public ActionResult GetInvitationWithEventInfo()
        {
            var getInvitationsWithEventInfo = _repository.GetInvitationWithEventInfo();
            return Ok(getInvitationsWithEventInfo);
        }
    }
}