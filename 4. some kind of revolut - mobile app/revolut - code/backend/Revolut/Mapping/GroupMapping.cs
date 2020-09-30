using Revolut.DtoModels;
using Revolut.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Data.Common;
using System.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace Revolut.Mapping
{
    public class GroupMapping : IGroupMapping
    {
        private string _connectionString;
        private DbConnection _dbConnection;

        public GroupMapping(IConfiguration configuration)
        {
            _connectionString = configuration["connectionStrings:MyAppDB"];
            _dbConnection = new SqlConnection(_connectionString);
        }

        public DtoGroup GetGroupDtoFromGroup(Group group)
        {
            var dtoGroup = new DtoGroup()
            {
                Name = group.Name,
                AdminPhoneNumber = group.AdminPhoneNumber
            };

            return dtoGroup;
        }

        public Group GetGroupFromGroupDTO(DtoGroup dtoGroup)
        {
            var sql = "Select U.PhoneNumber FROM dbo.GroupLinks GL " +
                      "Inner Join Users U On U.PhoneNumber = GL.PhoneNumber " +
                      "WHERE GL.AdminPhoneNumber = @AdminPhoneNumber AND " +
                      "GL.GroupName = @Name";
            var users = _dbConnection.Query<string>(sql,dtoGroup).ToList();

            var group = new Group()
            {
                Name = dtoGroup.Name,
                AdminPhoneNumber = dtoGroup.AdminPhoneNumber,
                Users = users
            };

            return group;
        }

        public Group GetGroupFromGroupKey(GroupKey groupKey)
        {
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

        public GroupKey GetGroupKeyFromGroupDTO(DtoGroup dtoGroup)
        {

            var groupKey = new GroupKey()
            {
                Name = dtoGroup.Name,
                PhoneNumber = dtoGroup.AdminPhoneNumber,
            };

            return groupKey;
        }

        public GroupKey GetGroupKeyFromGroupAdd(GroupAdd groupAdd)
        {
            var groupKey = new GroupKey()
            {
                Name = groupAdd.Name,
                PhoneNumber = groupAdd.PhoneNumber,
            };
            return groupKey;
        }
    }
}
