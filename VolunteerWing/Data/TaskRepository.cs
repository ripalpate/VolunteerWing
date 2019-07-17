using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace VolunteerWing.Data
{
    public class TaskRepository
    {
        readonly string _connectionString;

        public TaskRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public Task AddTask(string taskName, string comment, int numberOfPeopleNeed, int numberOfPeopleSignUp, int eventId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @"insert into tasks (taskName, comment, numberOfPeopleNeed, numberOfPeopleSignUp, eventId)
                                output inserted.*
                                values (@taskName, @comment, @numberOfPeopleNeed, @numberOfPeopleSignUp, @eventId)";
                var parameter = new { taskName, comment, numberOfPeopleNeed, numberOfPeopleSignUp, eventId };
                var newTask = db.QueryFirstOrDefault<Task>(sqlQuery, parameter);

                if (newTask != null)
                {
                    return newTask;
                }
            }
            throw new Exception("Sorry, task is not created");
        }

    }
}
