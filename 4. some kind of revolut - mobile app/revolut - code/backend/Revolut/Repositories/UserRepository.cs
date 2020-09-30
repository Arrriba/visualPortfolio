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

namespace Revolut.Repositories
{
    public class UserRepository : IUserRepository
    {
        private string _connectionString;
        private DbConnection _dbConnection;


        public UserRepository(IConfiguration configuration)
        {
            _connectionString = configuration["connectionStrings:MyAppDB"];
            _dbConnection = new SqlConnection(_connectionString);
        }
        
        public IList<User> GetAll()
        {
            var sql = "SELECT * FROM Users";
            var users = _dbConnection.Query<User>(sql).ToList();
            return users;
        }



        public User GetUserByName(string firstName, string lastName)
        {
            throw new NotImplementedException();
        }

        public User AddUser(User user)
        {
            var sql = "SELECT * FROM Users where PhoneNumber=@p";
            var u = _dbConnection.Query<User>(sql,new { p=user.PhoneNumber }).FirstOrDefault();
            
            //user already exists
            if (u != null)
            {
                return null;
            }

            var sqlAdd = "Insert Into Users(FirstName,LastName,PhoneNumber, Password, Amount)"+
                      "Values(@FirstName, @LastName, @PhoneNumber, @Password, @Amount)";
            _dbConnection.Query(sqlAdd, user);
            return user;
        }

        public User GetUserByPhoneNumber(string phoneNumber)
        {
            var sql = "SELECT * FROM Users where PhoneNumber=@p";
            var u = _dbConnection.Query<User>(sql, new { p = phoneNumber }).FirstOrDefault();
            return u;
        }

        public IList<User> GetUsersByName(string firstName, string lastName)
        {
            var sql = "Select * From Users where firstName = @firstName, fastName = @lastName";
            var multipleResults = _dbConnection.QueryMultiple(sql, new { firstName = firstName, lastName = lastName });
            var users = multipleResults.Read<User>().ToList();
            return users;
        }
        /*
        public void NewExpense(string phoneNumber,double amount)
        {
            var sql = "Select Amount From UserSpentPerDay"
        }
        */
        public void AddToUserPocket(string phoneNumber,double amount)
        {
            var sql = "Select Change From UserChange where PhoneNumber=@p";
            var u = _dbConnection.Query<double>(sql, new { p = phoneNumber }).ToList();
            if (u.Count==0)
            {
                var sqlAdd = "Insert Into UserChange(PhoneNumber, Change)" +
                         "Values(@PhoneNumber, @Amount)";
                _dbConnection.Query(sqlAdd, new { PhoneNumber = phoneNumber, Amount = amount });

            }
            else
            {
                var neww = u[0] + amount;
                var sqll = "Update UserChange set Change = @newAmount where PhoneNumber=@phoneeNumber";
                _dbConnection.Query(sqll, new { newAmount = neww, phoneeNumber = phoneNumber });
            }

        }

        public void SetUserPocket(string phoneNumber,double amount)
        {
            var sqll = "Update UserChange set Change = @newAmount where PhoneNumber=@phoneeNumber";
            _dbConnection.Query(sqll, new { newAmount = amount, phoneeNumber = phoneNumber });

        }

        public double GetUserChange(string phoneNumber)
        {
            var sql = "Select Change From UserChange where PhoneNumber=@p";
            var u = _dbConnection.Query<double>(sql, new { p = phoneNumber }).FirstOrDefault();
            return u;
        }

        public User UpdateUser(User user)
        {
            var us = GetUserByPhoneNumber(user.PhoneNumber);
       
            if (us == null)
                return null;
           var sql = "UPDATE Users " +
                        "SET Amount = @Amount, " +
                        "FirstName=@FirstName, " +
                        "LastName=@LastName, " +
                        "Password=@Password " +
                        "WHERE PhoneNumber=@PhoneNumber";

           _dbConnection.Query<User>(sql, new { Amount = user.Amount,FirstName=user.FirstName,LastName=user.LastName,Password=user.Password,PhoneNumber = us.PhoneNumber});

            return user;
        }
        public IList<string> MapPhonesToNames(IList<string> l)
        {
            var a = GetAll().Where(u => l.Contains(u.PhoneNumber));
            var x = a.Select(u => u.FirstName + " " + u.LastName).ToList();
            return x;
        }
        public Dictionary<string,string> MapPhonesToNamesDict(IList<string> l)
        {
            //finding friends
            var a = GetAll().Where(u => l.Contains(u.PhoneNumber));
            var dict = new Dictionary<string, string>();
            foreach(User u in a){
                dict.Add(u.PhoneNumber, u.FirstName + " " + u.LastName);
            }

            return dict;
        }

    }
}
