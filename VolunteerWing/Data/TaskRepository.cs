using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using VolunteerWing.Models;

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
        public Task GetSingleTask(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @"select *
                                from tasks
                                where id = @id";
                var parameter = new { id };
                var singleTask = db.QueryFirstOrDefault<Task>(sqlQuery, parameter);
                if (singleTask != null)
                {
                    return singleTask;
                }
            }
            throw new Exception("couldn't get single task");
        }

        public IEnumerable<Task> GetAllTasks()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @" select * 
                    from tasks
                    where isDeleted = 0";
                var allTasks = db.Query<Task>(sqlQuery).ToList();
                if (allTasks != null)
                {
                    return allTasks;
                }
                throw new Exception("Something went wrong. Could not get all tasks");
            }
        }

    }
}
