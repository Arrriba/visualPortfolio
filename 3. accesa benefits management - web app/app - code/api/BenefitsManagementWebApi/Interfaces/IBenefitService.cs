using BenefitsManagementWebApi.DTOModels;
using BenefitsManagementWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenefitsManagementWebApi.Interfaces
{
    public interface IBenefitService
    {
        List<Benefit> getProgramsForId(int Id);
        Benefit CreateBenefit(BenefitDTO benefitDTO);
        Messages DeleteBenefit(int Id);
        Benefit changeBenefitState(int Id);
    }
}
