using Dapper;
using BenefitsManagementWebApi.Interfaces;
using BenefitsManagementWebApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using Microsoft.Extensions.Configuration;
using BenefitsManagementWebApi.DTOModels;

namespace BenefitsManagementWebApi.Repositories
{
    public class AreaRepository : IAreaRepository
    {
        private string _connectionString;
        private DbConnection _dbConnection;
        private IBenefitRepository _benefitRepository;

        public AreaRepository(IConfiguration configuration, IBenefitRepository benefitRepository)
        {
            _connectionString = configuration["connectionStrings:AccesaBenefitsManagement"];
            _dbConnection = new SqlConnection(_connectionString);
            _benefitRepository = benefitRepository;

        }


        public void Delete(int Id, Area area)
        {
            var sql = "Delete From Areas where Id = @Id";
            
            _dbConnection.Query<Area>(sql, new { Id }).FirstOrDefault();
            

        }

        public Area Get(int id)
        {
            var sql = "SELECT Id, Name, Description, Logo, Icon " +
                      "FROM Areas " +
                      "WHERE Id = @Id";

           var area = _dbConnection.Query<Area>(sql, new { Id = id }).FirstOrDefault();

            return area;
        }

        public IList<Area> GetAll()
        {
            var sql = "SELECT * FROM Areas ";

            var areaList =_dbConnection.Query<Area>(sql).ToList();

            return areaList;
        }

        public AreaDTO SaveArea(AreaDTO area)
        {
            var sql = "INSERT INTO Areas(Name, Description, Icon, Logo) " +
                      "VALUES(@Name, @Description, '', '')";
            _dbConnection.Query(sql, new { Name = area.Name, Description = area.Description });

            return area;

        }

        public void Update(int id, AreaDTO updatedArea)
        {

            var oldArea = Get(id);


            var sql = "UPDATE Areas SET " +
                      "Name = @Name, " +
                      "Description = @Description, " +
                      "Logo = @Logo, " +
                      "Icon = @Icon " +
                      "WHERE Id = @Id";

            _dbConnection.Query(sql, new { Name = updatedArea.Name, Description = updatedArea.Description, Logo = oldArea.Logo, Icon = oldArea.Icon , Id = id });
            
        }

        public void InsertLogoURL(AreaDTO area, string Logo)
        {
            var sql = "UPDATE Areas SET " +
                      "Logo = @Logo " +
                      "WHERE Name = @Name";

            _dbConnection.Query(sql, new { Logo = Logo, Name = area.Name });
        }

        public void InsertIconURL(AreaDTO area, string Icon)
        {
            var sql = "UPDATE Areas SET " +
                      "Icon = @Icon " +
                      "WHERE Name = @Name";

            _dbConnection.Query(sql, new { Icon = Icon, Name = area.Name });
        }
    }
}
