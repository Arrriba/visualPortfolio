using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Common;
using System.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
namespace Revolut.Model
{
    public class Bill
    {
        private string _connectionString;
        private DbConnection _dbConnection;
        public Bill()
        {
        }
        public Bill(GroupKey groupKey,double amount) {
            GroupKeey = groupKey;
            Amount = amount;
            //Users = null;
            //AllPayed = false;
        }
        public GroupKey GroupKeey { get; set; }
        public double Amount { get; set; }

        public bool IsPayed()
        {
            var sql = "Select PhoneNumber from GroupBillsMembers where Payed=0";
            var u = _dbConnection.Query<string>(sql).ToList();
            if (u.Count == 0)
                return true;
            return false;
        }

        public IList<string> GetPhonesNotPaying()
        {
            var sql = "Select PhoneNumber from GroupBillsMembers where Payed=0";
            var u = _dbConnection.Query<string>(sql).ToList();
            return u;
        }

    }
}
