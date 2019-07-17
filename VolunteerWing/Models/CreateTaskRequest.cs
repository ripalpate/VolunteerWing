namespace VolunteerWing.Models
{
    public class CreateTaskRequest
    {
        public string TaskName { get; set; }
        public string Comment { get; set; }
        public int NumberOfPeopleNeed { get; set; }
        public int NumberOfPeopleSignUp { get; set; }
        public int EventId { get; set; }
    }
}
