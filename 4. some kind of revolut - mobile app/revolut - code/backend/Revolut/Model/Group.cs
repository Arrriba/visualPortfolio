using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Revolut.Model
{
    public class Group
    {
        public string Name { get; set; }
        public string AdminPhoneNumber { get; set; }
        public List<string> Users { get; set; }
    }
}
