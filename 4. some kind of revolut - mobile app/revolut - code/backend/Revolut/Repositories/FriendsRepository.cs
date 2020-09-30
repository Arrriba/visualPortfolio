using Revolut.Interfaces.Repositories;
using Revolut.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Revolut.DtoModels;
using Revolut.Mapping;

namespace Revolut.Repositories
{
    public class FriendsRepository : IFriendsRepository
    {
        private string _connectionString;
        private DbConnection _dbConnection;


        public FriendsRepository(IConfiguration configuration)
        {
            _connectionString = configuration["connectionStrings:MyAppDB"];
            _dbConnection = new SqlConnection(_connectionString);
        }

        public List<string> GetAll(string Phone)
        {
            var sql = "SELECT DISTINCT "+
                        "CASE WHEN F.UserPhone1 = @Phone THEN U2.PhoneNumber ELSE U.PhoneNumber END "+
                        "FROM dbo.Friendships F "+
                        "Inner Join Users U On U.PhoneNumber = F.UserPhone1 "+
                        "Inner Join Users U2 On U2.PhoneNumber = F.UserPhone2 "+
                        "WHERE F.UserPhone1 = @Phone OR F.UserPhone2 = @Phone";
            
            var friends = _dbConnection.Query<string>(sql,new { Phone}).ToList();
  
            return friends;
        }

        public void AddFriend(string adminPhoneNumber, string friendPhoneNumber)
        {
            
            var sql = "INSERT INTO Friendships(UserPhone1,UserPhone2) " +
                      "Values(@adminPhoneNumber,@friendPhoneNumber)";
            _dbConnection.Query(sql, new { adminPhoneNumber, friendPhoneNumber });
            

            //return groupKey;
        }

       

    }
}
