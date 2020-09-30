using Dapper;
using BenefitsManagementWebApi.Interfaces;
using BenefitsManagementWebApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using Microsoft.Extensions.Configuration;

namespace BenefitsManagementWebApi.Repositories
{
    public class BenefitRepository : IBenefitRepository
    {

        private string _connectionString;
        private DbConnection _dbConnection;

        public BenefitRepository(IConfiguration configuration)
        {
            _connectionString = configuration["connectionStrings:AccesaBenefitsManagement"];
            _dbConnection = new SqlConnection(_connectionString);
        }

        public Benefit Get(int Id)
        {
            var sql = "Select * from Programs where Id = @Id";

            var benefit = _dbConnection.Query<Benefit>(sql, new { Id }).FirstOrDefault();

            return benefit;
        }

        public Benefit changeBenefitState(int Id)
        {
            Benefit benefit = Get(Id);
            int initialState = benefit.Active;
            int Active;

            if(initialState == 0)
            {
                Active = 1;
            }
            else if(initialState == 1 )
            {
                Active = 0;
            }
            else
            {
                throw new Exception("Benefit was not initially set properly");
            }

            var sql = "UPDATE Programs SET " +
                      "Active = @Active " +
                      "WHERE Id = @Id";

            _dbConnection.Query(sql, new { Active = Active, Id = Id });

            Benefit changedBenefit = Get(Id);

            return changedBenefit;
        }

        public List<Benefit> GetAll(int AreaId)
        {
            var sql = "Select * From Programs Where AreaId = @AreaId order by Active";

            var programs = _dbConnection.Query<Benefit>(sql, new { AreaId }).ToList();

            return programs;
        }


        public List<Benefit> GetActive(int AreaId)
        {
            var sql = "Select * From Programs Where AreaId = @AreaId and Active = 1";
            var actives = _dbConnection.Query<Benefit>(sql, new { AreaId }).ToList();

            return actives;
        }

        public Benefit Put(Benefit benefit)
        {
                var sql = "Insert Into Programs([Name], [Description], [Url], [AreaId], [Active])" +
                        "Values(@Name, @Description, @Url, @AreaId, @Active)";

                _dbConnection.Query<Benefit>(sql, new
                {
                    Name = benefit.Name,
                    Description = benefit.Description,
                    Url = benefit.Url,
                    AreaId = benefit.AreaId,
                    Active = 0
                });
                return benefit;
        }

        public Benefit Delete(int Id)
        {
            var sql = "Delete from Programs where Id = @Id";

            var deleted = _dbConnection.Query<Benefit>(sql, new { Id = Id }).FirstOrDefault();

            return deleted;
        }

        public Messages DeleteAll(int AreaId)
        {
            var sql = "Delete from Programs where AreaId = @AreaId";
            _dbConnection.Query<Benefit>(sql, new { AreaId });

            return Messages.Success;
        }

    }
}
