using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using VolunteerWing.Models;

namespace VolunteerWing.Data
{
    public class UserTaskRepository
    {
        readonly string _connectionString;

        public UserTaskRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public UserTask AddUserTask(int userId, int taskId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @"insert into userTasks (userId, taskId)
                                output inserted.*
                                values (@userId, @taskId)";
                var parameter = new { userId, taskId };
                var newUserTask = db.QueryFirstOrDefault<UserTask>(sqlQuery, parameter);

                if (newUserTask != null)
                {
                    return newUserTask;
                }
            }
            throw new Exception("Sorry, userTask is not created");
        }
        public IEnumerable<UserTask> GetAllUsersTasks()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @" select * 
                    from userTasks";

                var allUsersTasks = db.Query<UserTask>(sqlQuery).ToList();
                if (allUsersTasks != null)
                {
                    return allUsersTasks;
                }
                throw new Exception("Something went wrong. Could not get all usersTasks");
            }
        }

        public UserTask GetSingleUserTask(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @"select *
                                from userTasks
                                where id = @id";
                var parameter = new { id };
                var singleUserTask = db.QueryFirstOrDefault<UserTask>(sqlQuery, parameter);
                if (singleUserTask != null)
                {
                    return singleUserTask;
                }
            }
            throw new Exception("Single userTask is not found");
        }

        public IEnumerable<Object> GetAllEventsThatUserSignup(int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @" Select VE.EventName, VE.StartDate, VE.StartTime, VE.EndTime, VE.Location, UserTasks.id as UserTaskId, VE.id 
                                From UserTasks
                                Join Tasks as T
                                on T.Id = UserTasks.TaskId
                                Join VolunteerEvents as VE
                                On VE.Id = T.EventId
                                Where UserTasks.UserId = @userId;";
                var parameters = new { userId };
                var allSignupEvents = db.Query<Object>(sqlQuery, parameters).ToList();
                if (allSignupEvents != null)
                {
                    return allSignupEvents;
                }
                throw new Exception("Something went wrong. Could not get all signup events");
            }
        }
        public UserTask UpdateUserTask(UserTask userTaskToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery =
                    @"update userTasks 
                      set userId = @userId,
                          taskId = @taskId
                     Where Id = @id";

                var rowsAffected = db.Execute(sqlQuery, userTaskToUpdate);

                if (rowsAffected == 1)
                {
                    return userTaskToUpdate;
                }
                throw new Exception("Could not update userTask");
            }
        }

        public void DeleteUserTask(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var parameter = new { id };
                var deleteQuery = "Delete From UserTasks Where Id = @id";
                var rowsAffected = db.Execute(deleteQuery, parameter);
                if (rowsAffected != 1)
                {
                    throw new Exception("Didn't do right");
                }

            }
        }
    }
}
