using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Revolut.DtoModels
{
    public class DtoUser
    {
            public int Id { get; set; }
            [Required]
            [MaxLength(30)]
            public string FirstName { get; set; }
            [Required]
            [MaxLength(30)]
            public string LastName { get; set; }
            public int Amount { get; set; }

    }
}
