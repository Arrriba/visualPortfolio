using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Revolut.Model
{
    public class GroupBill
    {
        public int Id { get; set; }
        public string GroupName { get; set; }
        public string AdminPhoneNumber { get; set; }
        public string DateCreated { get; set; }
        public double Amount { get; set; }
    }
}
