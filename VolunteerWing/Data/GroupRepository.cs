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
    public class GroupRepository
    {
        readonly string _connectionString;

        public GroupRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public Group AddGroup(string groupName, int adminId)
        {

            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @"insert into groups (groupName, adminId)
                                output inserted.*
                                values (@groupName, @adminId)";
                var parameter = new { groupName, adminId };
                var newGroup = db.QueryFirstOrDefault<Group>(sqlQuery, parameter);

                if (newGroup != null)
                {
                    return newGroup;
                }
            }
            throw new Exception("Sorry, group is not created");
        }

        public Group GetSingleGroup(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @"select *
                                from groups
                                where id = @id";
                var parameter = new { id };
                var singleGroup = db.QueryFirstOrDefault<Group>(sqlQuery, parameter);
                if (singleGroup != null)
                {
                    return singleGroup;
                }
            }
            throw new Exception("couldn't get single group");
        }

        public IEnumerable<Group> GetAllGroups()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @" select * 
                                  from groups";
                var allGroups = db.Query<Group>(sqlQuery).ToList();
                if (allGroups != null)
                {
                    return allGroups;
                }
                throw new Exception("Something went wrong. Could not get all groups");
            }
        }

        public IEnumerable<Object> GetAllGroupsByAdminId(int adminId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @" select * 
                                  from groups
                                  where adminId =@adminId";
                var parameter = new { adminId };
                var allGroups = db.Query<Object>(sqlQuery,parameter).ToList();
                if (allGroups != null)
                {
                    return allGroups;
                }
                throw new Exception("Something went wrong. Could not get all groups");
            }
        }

        public Group UpdateGroup(Group groupToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery =
                    @"update groups 
                      set groupName = @groupName
                          Where id = @id";

                var rowsAffected = db.Execute(sqlQuery, groupToUpdate);

                if (rowsAffected == 1)
                {
                    return groupToUpdate;
                }
                throw new Exception("Could not update group");
            }
        }

        public void DeleteGroup(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @"Delete From groups
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
