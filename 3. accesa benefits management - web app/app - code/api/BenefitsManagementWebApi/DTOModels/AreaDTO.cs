
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using System.ComponentModel.DataAnnotations;
using System.IO;

namespace BenefitsManagementWebApi.DTOModels
{
    public class AreaDTO
    {
        public int Id { get; set; }
        //[Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public IFormFile Logo { get; set; }
        public IFormFile Icon { get; set; }
    }
}
