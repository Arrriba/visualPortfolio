using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Revolut.Model
{
    public class GroupAdd
    {
        [Required]
        [MaxLength(30)]
        public string PhoneNumber { get; set; }
        [Required]
        [MaxLength(30)]
        public string FriendPhoneNumber { get; set; }
        [Required]
        [MaxLength(30)]
        public string Name { get; set; }
    }
}
