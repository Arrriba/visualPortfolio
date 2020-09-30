using BenefitsManagementWebApi.DTOModels;
using BenefitsManagementWebApi.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BenefitsManagementWebApi.Interfaces
{
    public interface IAreaService
    {
        Area GetArea(int id);
        IList<Area> GetAreas();
        void AddArea(AreaDTO area);
        void RemoveArea(int id);
        string uploadFile(IFormFile file);
        void UpdateArea(int id, AreaDTO newArea);
    }
}
