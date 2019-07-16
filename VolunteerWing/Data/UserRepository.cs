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
    public class UserRepository
    {
        readonly string _connectionString;

        public UserRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public User AddUser(string email, string firebaseId, string name, string street, string city,
                            string state, string zipcode, string phoneNumber, int age, bool isAdmin)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newUser = db.QueryFirstOrDefault<User>(@"
                    insert into users (email, firebaseId, name, street, city, state, zipcode, phoneNumber, age, isAdmin)
                    output inserted.*
                    values (@email, @firebaseId, @name, @street, @city, @state, @zipcode, @phoneNumber, @age, @isAdmin)",
                    new { email, firebaseId, name, street, city, state, zipcode, phoneNumber, age, isAdmin });

                if (newUser != null)
                {
                    return newUser;
                }
            }
            throw new Exception("No user created");
        }
        public User GetSingleUser(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @"select *
                                from users
                                where id = @id";
                var parameter = new { id };
                var singleUser = db.QueryFirstOrDefault<User>(sqlQuery, parameter);
                if (singleUser != null)
                {
                    return singleUser;
                }
            }
            throw new Exception("single user is not found");
        }
        public IEnumerable<User> GetAllUsers()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @" select * 
                    from users
                    where isActive = 1";
                var allUsers = db.Query<User>(sqlQuery).ToList();
                if (allUsers != null)
                {
                    return allUsers;
                }
                throw new Exception("Something went wrong. Could not get all users.");
            }
        }

    }
}
