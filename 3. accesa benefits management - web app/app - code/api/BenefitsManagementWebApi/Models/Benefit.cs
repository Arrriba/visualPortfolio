using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenefitsManagementWebApi.Models
{
    public class Benefit
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public int Active { get; set; }

        public int AreaId { get; set; }
    }
}
