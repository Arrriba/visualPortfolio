using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Revolut.DtoModels
{
    public class PayModel
    {
        public PayModel()
        {

        }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public double Amount { get; set; }

    }
}
