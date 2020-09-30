using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenefitsManagementWebApi.DTOModels
{
    public class BenefitDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public int AreaId { get; set; }
    }
}
