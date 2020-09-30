using System.ComponentModel.DataAnnotations;

namespace BenefitsManagementWebApi.Models
{
    public class Area
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Logo { get; set; }
        public string Icon { get; set; }  
    }
}
