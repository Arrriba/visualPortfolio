using BenefitsManagementWebApi.DTOModels;
using BenefitsManagementWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenefitsManagementWebApi.Interfaces
{
    public interface IAreaRepository
    {
        AreaDTO SaveArea(AreaDTO area);
        void Update(int id, AreaDTO updatedArea);
        void Delete(int id, Area area);
        Area Get(int id);
        IList<Area> GetAll();
        void InsertIconURL(AreaDTO area, string iconURL);
        void InsertLogoURL(AreaDTO area, string logoURL);
    }
}