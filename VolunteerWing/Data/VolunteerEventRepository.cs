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
                var newVolunteerEvent = db.QueryFirstOrDefault<VolunteerEvent>(@"
                    insert into volunteerEvent (eventName, startDate, startTime, endTime, adminId)
                    output inserted.*
                    values (@eventName, @startDate, @startTime, @endTime, @adminId)",
                    new { eventName, startDate, startTime, endTime, adminId });

                if (newVolunteerEvent != null)
                {
                    return newVolunteerEvent;
                }
            }
            throw new Exception("No volunteer event created");
        }
    }
}
