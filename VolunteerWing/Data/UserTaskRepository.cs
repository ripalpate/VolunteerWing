using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Data.SqlClient;
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
    }
}
