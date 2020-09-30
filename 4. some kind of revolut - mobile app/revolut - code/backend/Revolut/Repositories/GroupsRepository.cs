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
    public class GroupsRepository : IGroupsRepository
    {
        private string _connectionString;
        private DbConnection _dbConnection;


        public GroupsRepository(IConfiguration configuration)
        {
            _connectionString = configuration["connectionStrings:MyAppDB"];
            _dbConnection = new SqlConnection(_connectionString);
        }

        public IList<Group> GetAll()
        {
            var sql = "SELECT * FROM Groups ";
            var sql1 = "Select U.PhoneNumber FROM dbo.GroupLinks GL " +
                        "Inner Join Users U On U.PhoneNumber = GL.PhoneNumber " +
                        "WHERE GL.AdminPhoneNumber = @AdminPhoneNumber AND " +
                        "GL.GroupName = @Name";
                var groups = _dbConnection.Query<Group>(sql).ToList();
            foreach (Group g in groups)
            {
                var AdminPhoneNumber = g.AdminPhoneNumber;
                var Name = g.Name;
                var users = _dbConnection.Query<string>(sql1,new { AdminPhoneNumber, Name }).ToList();
                    g.Users = users;
                }

            return groups;
        }
        
        public GroupKey GetGroupKey(string adminPhoneNumber, string name)
        {
            var sql = "SELECT AdminPhoneNumber, Name FROM Groups " +
                      "WHERE AdminPhoneNumber=@adminPhoneNumber and Name=@name";
            //var n = new GroupKey(adminPhoneNumber, name);
            var dtoGroup = _dbConnection.Query<DtoGroup>(sql, new { adminPhoneNumber, name }).FirstOrDefault();
            if (dtoGroup == null)
            {
                return null;
            }
            var groupKey = new GroupKey(dtoGroup.AdminPhoneNumber, dtoGroup.Name);
            //var g = _dbConnection.Query<GroupKey>(sql, n).FirstOrDefault();
            //var groupKey = new GroupKey(g.AdminPhoneNumber, g.Name);

            return groupKey;
        }

        public GroupKey AddGroup(string phoneNumber, string name)
        {
            var exists = GetGroupKey(phoneNumber, name);
            if (exists != null)
            {
                return exists;
            }
            var sql = "Insert into Groups(AdminPhoneNumber,Name) " +
                        "Values (@phoneNumber,@name)";
            _dbConnection.Query(sql, new { phoneNumber, name });
            return null;
        }

        public GroupKey DeleteGroup(string phoneNumber, string name)
        {
            var exists = GetGroupKey(phoneNumber, name);
            if (exists == null)
            {
                return null;
            }
            var sql = "DELETE FROM Groups WHERE Name=@name and AdminPhoneNumber=@phoneNumber";
            _dbConnection.Query(sql, new { name, phoneNumber });
            return exists;
        }
        public Group UpdateGroup(Group group)
        {
            var exists = GetGroupKey(group.AdminPhoneNumber, group.Name);
            if (exists == null)
            {
                return null;
            }
            var sql = "UPDATE Groups " +
                       "SET AdminPhoneNumber = @AdminPhoneNumber, " +
                       "Name=@Name " +
                       "WHERE AdminPhoneNumber=@AdminPhoneNumber and Name=@Name";

            _dbConnection.Query(sql, group);
            return group;
        }

        public GroupKey UpdateGroupKey(GroupKey groupKey,GroupKey newKey)
        {
            var exists = GetGroupKey(groupKey.PhoneNumber, groupKey.Name);
            if (exists == null)
            {
                return null;
            }
            var NewAdminPhoneNumber = newKey.PhoneNumber;
            var NewName = newKey.Name;
            var PhoneNumber = groupKey.PhoneNumber;
            var Name = groupKey.Name;
            var sql = "UPDATE Groups " +
                      "SET AdminPhoneNumber = @NewAdminPhoneNumber, " +
                      "Name=@NewName " +
                      "WHERE AdminPhoneNumber=@PhoneNumber and Name=@Name";

            _dbConnection.Query(sql,new { NewAdminPhoneNumber, NewName, PhoneNumber,Name});
            return newKey;
        }

        public Group GetGroup(GroupKey groupKey)
        {
            var exists = GetGroupKey(groupKey.PhoneNumber, groupKey.Name);
            if (exists == null)
            {
                return null;
            }
            var sql = "Select U.PhoneNumber FROM dbo.GroupLinks GL " +
                      "Inner Join Users U On U.PhoneNumber = GL.PhoneNumber " +
                      "WHERE GL.AdminPhoneNumber = @PhoneNumber AND " +
                      "GL.GroupName = @Name";
            var users = _dbConnection.Query<string>(sql, groupKey).ToList();

            var group = new Group()
            {
                Name = groupKey.Name,
                AdminPhoneNumber = groupKey.PhoneNumber,
                Users = users
            };

            return group;
        }

        public List<string> GetGroupMembers(GroupKey groupKey)
        {
            var group = GetGroup(groupKey);
            var list = group.Users;
            return list;
        }

        public Group AddToGroup(GroupKey groupKey,string friendPhoneNumber)
        {
            var sql = "Insert into GroupLinks(PhoneNumber,AdminPhoneNumber,GroupName) " +
                         "Values (@friendPhoneNumber,@phoneNumber,@name)";
            var phoneNumber = groupKey.PhoneNumber;
            var name = groupKey.Name;
            _dbConnection.Query(sql, new { friendPhoneNumber,phoneNumber, name });
            var group = GetGroup(groupKey);
            return group;
        }

        public Group RemoveFromGroup(GroupKey groupKey, string friendPhoneNumber)
        {
            var sql = "DELETE FROM GroupLinks WHERE GroupName=@name and AdminPhoneNumber=@phoneNumber and PhoneNumber=@friendPhoneNumber";
            var phoneNumber = groupKey.PhoneNumber;
            var name = groupKey.Name;
            _dbConnection.Query(sql, new { friendPhoneNumber, phoneNumber, name });
            var group = GetGroup(groupKey);
            return group;
        }

    }
}
