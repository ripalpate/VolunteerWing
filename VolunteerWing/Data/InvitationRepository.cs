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
    public class InvitationRepository
    {
        readonly string _connectionString;

        public InvitationRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public Invitation AddInvitation(string userEmail, int eventId, string link)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newInvitation = db.QueryFirstOrDefault<Invitation>(@"
                    insert into invitation (userEmail, eventId, link)
                    output inserted.*
                    values (@userEmail, @eventId, @link)",
                    new { userEmail, eventId, link });

                if (newInvitation != null)
                {
                    return newInvitation;
                }
            }
            throw new Exception("No invitation created");
        }
        public Invitation GetSingleInvitation(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @"select *
                                from invitation
                                where id = @id";
                var parameter = new { id };
                var singleInvitation = db.QueryFirstOrDefault<Invitation>(sqlQuery, parameter);
                return singleInvitation;
            }
        }
        public IEnumerable<Invitation> GetAllInvitations()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sqlQuery = @" select * 
                    from invitation";
                var allInvitations = db.Query<Invitation>(sqlQuery).ToList();
                if (allInvitations != null)
                {
                    return allInvitations;
                }
                throw new Exception("Something went wrong. Could not get all invitations.");
            }
        }

    }
}
