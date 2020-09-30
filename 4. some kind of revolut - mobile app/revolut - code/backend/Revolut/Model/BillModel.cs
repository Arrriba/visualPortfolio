using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Common;
using System.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;


namespace Revolut.Model
{
    public class BillModel
    {
        private string _connectionString;
        private DbConnection _dbConnection;
        public BillModel()
        {
        }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public int IdBill { get; set; }
        public int Payed { get; set; }
        public double Amount { get; set; }
    }
}
