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
    public class BillsRepository : IBillsRepository
    {
        private string _connectionString;
        private DbConnection _dbConnection;


        public BillsRepository(IConfiguration configuration)
        {
            _connectionString = configuration["connectionStrings:MyAppDB"];
            _dbConnection = new SqlConnection(_connectionString);
        }

        public Bill AddBill(Bill bill)
        {
            var sqlAdd = "Insert Into GroupBills(GroupName,AdminPhoneNumber,Amount)" +
                      "Values(@groupName, @adminPhoneNumber, @amount)";
            _dbConnection.Query(sqlAdd, new{ groupName=bill.GroupKeey.Name, adminPhoneNumber = bill.GroupKeey.PhoneNumber, amount = bill.Amount });

            return null;
        } 

        public List<BillModel> GetUserBills(string phoneNumber)
        {
            var sql = "select * from GroupBillsMembers where PhoneNumber = @ph";
            var b = _dbConnection.Query<BillModel>(sql, new { ph = phoneNumber }).ToList();
            return b;
        }

        public List<BillModel> GetBillModels()
        {
            var sql = "select * from GroupBillsMembers";
            var b = _dbConnection.Query<BillModel>(sql).ToList();
            return b;
        }

        public BillModel GetBillById(int id)
        {
            var sql = "select * from GroupBills where Id = @i";
            var b = _dbConnection.Query<BillModel>(sql, new { i = id }).FirstOrDefault();
            return b;
        }

        public void UpdateBill(BillModel billModel)
        {
            var b = GetBillById(billModel.IdBill);
            var sql = "UPDATE GroupBillsMembers " +
                        "SET Payed = 1 "+
                        "WHERE PhoneNumber=@phoneNumber and IdBill = @i";

            _dbConnection.Query(sql, new { phoneNumber = billModel.PhoneNumber, i = billModel.IdBill});
        }

        public List<BillModel> GetUnpayedUserBills(string phoneNumber)
        {
            var sql = "select * from GroupBillsMembers where PhoneNumber = @ph and Payed = 0";
            var b = _dbConnection.Query<BillModel>(sql, new { ph = phoneNumber }).ToList();
            return b;
        }

        public GroupBill GetBill(Bill bill)
        {
            var sql = "Select * from GroupBills where Amount = @amount and AdminPhoneNumber=@adminPhoneNumber and GroupName=@groupName";
            var b = _dbConnection.Query<GroupBill>(sql, new { amount=bill.Amount,adminPhoneNumber=bill.GroupKeey.PhoneNumber, groupName=bill.GroupKeey.Name}).FirstOrDefault();
            return b;
        }

        public void AddBillMemberAmount(List<string> phonesList,Bill bill,double amount)
        {
            var idB = GetBill(bill).Id;
            foreach (string no in phonesList)
            {
                var sqlAdd = "Insert Into GroupBillsMembers(IdBill,PhoneNumber,Amount)" +
                         "Values(@idd, @phone, @am)";
                _dbConnection.Query(sqlAdd, new { idd = idB, phone = no, am = amount });
            }
        }

        public IList<GroupBill> GetAllBills()
        {
            var sql = "Select * from GroupBills";
            var bills = _dbConnection.Query<GroupBill>(sql).ToList();
            return bills;
        }
        public GroupBill GetGroupBill(int id)
        {
            var sql = "Select * from GroupBills where Id = @i";
            var bill = _dbConnection.Query<GroupBill>(sql,new { i = id}).FirstOrDefault();
            return bill;

        }
    }
}
