﻿using Dapper;
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
                if (singleVolunteerEvent != null)
                {
                    return singleVolunteerEvent;
                }
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
                if (allVolunteerEvents != null)
                {
                    return allVolunteerEvents;
                }
                throw new Exception("Something went wrong. Could not get all volunteerEvents");
            }
        }

        public VolunteerEvent UpdateVolunteerEvent(VolunteerEvent volunteerEventToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql =
                    @"update volunteerEvents 
                      set eventName = @eventName,
                          startDate = @startDate,
	                      startTime= @startTime,
	                      endTime= @endTime, 
	                      adminId= @adminId, 
                          isDeleted = 0
                     Where Id = @id";

                var rowsAffected = db.Execute(sql, volunteerEventToUpdate);

                if (rowsAffected == 1)
                {
                    return volunteerEventToUpdate;
                }
                throw new Exception("Could not update volunteerEvent");
            }
        }
    }
}
