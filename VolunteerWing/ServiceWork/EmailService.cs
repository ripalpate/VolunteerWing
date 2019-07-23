using System;
using Microsoft.Extensions.Options;
using RestSharp;
using RestSharp.Authenticators;

namespace VolunteerWing.ServiceWork
{
    public class EmailService
    {
        readonly string _apiKeys;
        readonly string _apiBaseUrl;

        public EmailService(IOptions<DbConfiguration> dbConfig)
        {
            _apiKeys = dbConfig.Value.ApiKeys;
            _apiBaseUrl = dbConfig.Value.ApiBaseUrl;
        }
        public IRestResponse SendSimpleMessage(string from, string to, string subject, string body)
        {
            RestClient client = new RestClient();
            client.BaseUrl = new Uri("https://api.mailgun.net/v3");
            client.Authenticator = 
                new HttpBasicAuthenticator("api", _apiKeys);
            RestRequest request = new RestRequest();
            request.AddParameter("domain", _apiBaseUrl, ParameterType.UrlSegment);
            request.Resource = "{domain}/messages";
            request.AddParameter("from", from);
            request.AddParameter("to", to);
            //request.AddParameter("to", "ripal@sandboxe6335530e5084e4587b9fee641dd8733.mailgun.org");
            request.AddParameter("subject", subject);
            request.AddParameter("text", body);
            request.Method = Method.POST;
            return client.Execute(request);
        }
    }
}
