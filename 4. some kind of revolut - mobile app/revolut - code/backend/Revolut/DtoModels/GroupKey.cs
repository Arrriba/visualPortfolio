using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Revolut.Model
{
    public class GroupKey
    {
        public GroupKey() { }
        public GroupKey(string phoneNumber,string name)
        {
            PhoneNumber = phoneNumber;
            Name = name;
        }
        [Required]
        [MaxLength(10)]
        public string PhoneNumber { get; set; }
        [Required]
        [MaxLength(30)]
        public string Name { get; set; }
       
    }
}
