using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Revolut.Model;

namespace Revolut.DtoModels
{
    public class UserLeftAmount
    {
        public UserLeftAmount()
        {

        }
        public UserLeftAmount(User user, int amount)
        {
            this.User = User;
            this.Amount = amount;
        }
        [Required]
        public User User { get; set; }
        [Required]
        public double Amount { get; set; }
    }
}
