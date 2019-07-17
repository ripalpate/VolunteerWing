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
            throw new Exception("Single user task is not found");
        }

    }
}
