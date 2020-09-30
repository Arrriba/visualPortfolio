using BenefitsManagementWebApi.DTOModels;
using BenefitsManagementWebApi.Interfaces;
using BenefitsManagementWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenefitsManagementWebApi.Services
{
    public class BenefitService : IBenefitService
    {

        IBenefitRepository _benefitRepository;
        public BenefitService(IBenefitRepository benefitRepository)
        {
            _benefitRepository = benefitRepository;
        }

        public List<Benefit> getProgramsForId(int Id)
        {
            var programs = _benefitRepository.GetAll(Id);
            return programs;
        }

        public Benefit changeBenefitState(int Id)
        {
            return _benefitRepository.changeBenefitState(Id);
        }

        public Benefit CreateBenefit(BenefitDTO benefitDTO)
        {
            var mappedBenefit = new Benefit
            {
                Name = benefitDTO.Name,
                Description = benefitDTO.Description,
                Url = benefitDTO.Url,
                AreaId = benefitDTO.AreaId,
                Active = 0
            };
            _benefitRepository.Put(mappedBenefit);
            return mappedBenefit;
        }

        public Messages DeleteBenefit(int Id)
        {
            var target = _benefitRepository.Get(Id);

            if (target == null)
                return Messages.NotFound;

            if (target.Active == 1)
                return Messages.AccessDenied;

            _benefitRepository.Delete(Id);

            return Messages.Success;
        }
    }
}
