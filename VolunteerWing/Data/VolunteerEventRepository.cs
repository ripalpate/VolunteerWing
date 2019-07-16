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
    public class VolunteerEventRepository
    {
        readonly string _connectionString;

        public VolunteerEventRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public VolunteerEvent AddVolunteerEvent(string eventName, DateTime startDate, TimeSpan startTime, TimeSpan endTime, int adminId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @"insert into volunteerEvents (eventName, startDate, startTime, endTime, adminId)
                                output inserted.*
                                values (@eventName, @startDate, @startTime, @endTime, @adminId)";
                var parameter = new { eventName, startDate, startTime, endTime, adminId };
                var newVolunteerEvent = db.QueryFirstOrDefault<VolunteerEvent>(sqlQuery, parameter);

                if (newVolunteerEvent != null)
                {
                    return newVolunteerEvent;
                }
            }
            throw new Exception("No volunteer event created");
        }

        public VolunteerEvent GetSingleVolunteerEvent(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @"select *
                                from volunteerEvents
                                where id = @id";
                var parameter = new { id };
                var singleVolunteerEvent = db.QueryFirstOrDefault<VolunteerEvent>(sqlQuery, parameter);
                return singleVolunteerEvent;
            }
            throw new Exception("Single volunteer event is not found");
        }

        public IEnumerable<VolunteerEvent> GetAllVolunteeerEvent()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @" select * 
                    from volunteerEvents
                    where isDeleted = 0";
                var allVolunteerEvents = db.Query<VolunteerEvent>(sqlQuery).ToList();
                return allVolunteerEvents;
            }
        }
    }
}
