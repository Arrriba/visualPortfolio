using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Revolut.Model
{
    public class TransferModel
    {
        
        [Required]
        [MaxLength(30)]
        public string PhoneNumber { get; set; }
        [Required]
        [MaxLength(30)]
        public string TargetPhoneNumber { get; set; }
        [Required]
        public int Amount { get; set; }

    }
}
