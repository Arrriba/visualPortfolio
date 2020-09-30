using Dapper;
using BenefitsManagementWebApi.Interfaces;
using BenefitsManagementWebApi.Model;
using System;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using Microsoft.Extensions.Configuration;
using BenefitsManagementWebApi.DTOModels;


namespace BenefitsManagementWebApi.Repositories
{
    public class UserRepository : IUserRepository
    {
        public DateTime unlocked = DateTime.MinValue.AddYears(1800);
        DateTime locked = DateTime.MinValue.AddYears(1800).AddDays(1);

        private string _connectionString;
        private DbConnection _dbConnection;

        public UserRepository(IConfiguration configuration)
        {
            _connectionString = configuration["connectionStrings:AccesaBenefitsManagement"];
            _dbConnection = new SqlConnection(_connectionString);
        }

        public void UpdateSalt(string Email, string passwordSalt)
        {
            var sql = "UPDATE Users SET " +
                      "passwordSalt = @passwordSalt " +
                      "WHERE Email = @Email";

            _dbConnection.Query(sql, new { Email = Email, passwordSalt = passwordSalt });
        }


        public User GetUser(string Email)
        {
            var sql = "SELECT Id, Email, Password, ExpirationDate " +
                       "FROM Users "+
                       "WHERE Email = @Email";
            var dbUser = _dbConnection.Query<User>(sql, new { Email = Email }).FirstOrDefault();
            return dbUser;
        }


        public string ChangePassword(User user, string Password, DateTime setDate = new DateTime())
        {

            setDate = unlocked;

            var sql = "Update Users SET " +
                     "Password = @Password, " +
                     "ExpirationDate = @ExpirationDate " +
                     "WHERE Email = @Email";

            _dbConnection.Query( sql, new {Email = user.Email, Password = Password, ExpirationDate = setDate} );

            return user.Password;
        }

        public string ResetPassword(ChangePasswordDTO user, string newPassword, DateTime setDate = new DateTime())
        {
            var sql = "Update Users SET " +
                     "Password = @Password, " +
                     "ExpirationDate = @ExpirationDate " +
                     "WHERE Email = @Email";


            setDate = DateTime.Now;

            setDate = setDate.AddDays(1);

            var resetPassword = _dbConnection.Query(sql, new { Password = newPassword, Email = user.Email, ExpirationDate = setDate });

            return newPassword;

        }

        public void Update(User user)
        {
            var sql = "Update Users SET " +
                     "Password = @Password, " +
                     "ExpirationDate = @ExpirationDate "+
                     "WHERE Email = @Email";

            _dbConnection.Query(sql, user);
        }
    }
}
