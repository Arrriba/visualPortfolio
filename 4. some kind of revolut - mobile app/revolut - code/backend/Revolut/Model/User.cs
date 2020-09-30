using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Revolut.Model
{
    public class User
    {
        //public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        [MaxLength(30)]
        public string PhoneNumber { get; set; }
        [Required]
        [MaxLength(30)]
        public string Password { get; set; }
        public int Amount { get; set; }

    }
}
