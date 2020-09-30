using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace Revolut.DtoModels
{
    public class DtoGroup
    {
        public DtoGroup()
        {

        }
        public DtoGroup(string name,string adminPhoneNumber)
        {
            this.AdminPhoneNumber = adminPhoneNumber;
            this.Name = name;
        }
        [Required]
        [MaxLength(10)]
        public string AdminPhoneNumber { get; set; }
        [Required]
        [MaxLength(30)]
        public string Name { get; set; }
    }
}
