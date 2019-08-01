using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using VolunteerWing.Models;

namespace VolunteerWing.Data
{
    public class UserGroupRepository
    {
        readonly string _connectionString;

        public UserGroupRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public UserGroup AddUserGroup(string userEmail, int groupId)
        {

            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @"insert into userGroups (userEmail, groupId)
                                output inserted.*
                                values (@userEmail, @groupId)";
                var parameter = new { userEmail, groupId };
                var newUserGroup = db.QueryFirstOrDefault<UserGroup>(sqlQuery, parameter);

                if (newUserGroup != null)
                {
                    return newUserGroup;
                }
            }
            throw new Exception("Sorry, user group is not created");
        }

        public UserGroup GetSingleUserGroup(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @"select *
                                from userGroups
                                where id = @id";
                var parameter = new { id };
                var singleUserGroup = db.QueryFirstOrDefault<UserGroup>(sqlQuery, parameter);
                if (singleUserGroup != null)
                {
                    return singleUserGroup;
                }
            }
            throw new Exception("couldn't get single user group");
        }

        public IEnumerable<UserGroup> GetAllUserEmailsByGroup(int groupId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @" select * 
                                  from userGroups
                                  where groupId = @groupId";
                var parameters = new { groupId };
                var allEmailsByGroupId = db.Query<UserGroup>(sqlQuery, parameters).ToList();
                if (allEmailsByGroupId != null)
                {
                    return allEmailsByGroupId;
                }
                throw new Exception("Something went wrong. Could not get all emails");
            }
        }

        public IEnumerable<UserGroup> GetAllUsersGroups()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @" select * 
                                  from userGroups";
                var allUsersGroups = db.Query<UserGroup>(sqlQuery).ToList();
                if (allUsersGroups != null)
                {
                    return allUsersGroups;
                }
                throw new Exception("Something went wrong. Could not get all emails");
            }
        }

        public UserGroup UpdateUserGroup(UserGroup userGroupToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery =
                    @"update userGroups 
                      set userEmail = @userEmail,
                          groupId = @groupId
                          Where id = @id";

                var rowsAffected = db.Execute(sqlQuery, userGroupToUpdate);

                if (rowsAffected == 1)
                {
                    return userGroupToUpdate;
                }
                throw new Exception("Could not update user group");
            }
        }

        public void DeleteUserGroup(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @"Delete From userGroups
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
