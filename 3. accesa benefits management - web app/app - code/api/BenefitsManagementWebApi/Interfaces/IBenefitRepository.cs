using BenefitsManagementWebApi.DTOModels;
using BenefitsManagementWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenefitsManagementWebApi.Interfaces
{
    public interface IBenefitRepository
    {

        Benefit Get(int Id);
        List<Benefit> GetAll(int AreaId);
        Benefit Put(Benefit benefit);

        List<Benefit> GetActive(int AreaId);

        Benefit Delete(int Id);

        Messages DeleteAll(int AreaId);
        Benefit changeBenefitState(int Id);
    }
}
