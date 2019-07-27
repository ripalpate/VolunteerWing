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
                                  from tasks";
                var allTasks = db.Query<Task>(sqlQuery).ToList();
                if (allTasks != null)
                {
                    return allTasks;
                }
                throw new Exception("Something went wrong. Could not get all tasks");
            }
        }
        public Task UpdateTask(Task taskToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery =
                    @"update tasks 
                      set taskName = @TaskName,
                          comment = @comment,
                          numberOfPeopleNeed = @numberOfPeopleNeed,
	                      numberOfPeopleSignUp= @numberOfPeopleSignUp,
                          eventId = @eventId
                     Where Id = @id";

                var rowsAffected = db.Execute(sqlQuery, taskToUpdate);

                if (rowsAffected == 1)
                {
                    return taskToUpdate;
                }
                throw new Exception("Could not update task");
            }
        }

        public Task UpdatePeopleSignUp(Task taskToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @"update tasks
                            set numberOfPeopleSignUp = numberOfPeopleSignUp + 1
                            Where tasks.id = @id";
                var rowsAffected = db.Execute(sqlQuery, taskToUpdate);

                if (rowsAffected == 1)
                {
                    return taskToUpdate;
                }
                throw new Exception("Could not update numberOfPeopleSignup");
            }
        }

        public Task UpdatePeopleSignUpUponDelete(Task taskToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @"update tasks
                            set numberOfPeopleSignUp = numberOfPeopleSignUp - 1
                            Where tasks.id = @id";
                var rowsAffected = db.Execute(sqlQuery, taskToUpdate);

                if (rowsAffected == 1)
                {
                    return taskToUpdate;
                }
                throw new Exception("Could not update numberOfPeopleSignup");
            }
        }

        public void DeleteTask(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @"Delete From tasks
                                 Where Id = @id";
                var parameter = new { Id = id };
                var rowsAffected = db.Execute(sqlQuery, parameter);

                if (rowsAffected != 1)
                {
                    throw new Exception("Didn't do right");
                }
            }
        }
    }
}
