using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BenefitsManagementWebApi.DTOModels;
using BenefitsManagementWebApi.Interfaces;
using BenefitsManagementWebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BenefitsManagementWebApi.Controllers
{



    [Route("api/benefits")]
    [ApiController]
    public class BenefitController : ControllerBase
    {

        IBenefitService _benefitService;

        public BenefitController(IBenefitService benefitService)
        {
            _benefitService = benefitService;
        }
        // GET: api/Program
        [HttpGet("{id}")]
        public IActionResult GetProgramsForArea(int id)
        {
            try
            {
                var programs = _benefitService.getProgramsForId(id);
                return Ok(programs);

            } catch(Exception)
            {
                return StatusCode(500, "Something went wrong.");
            }
        }
        
        // POST: api/Program


        [HttpPost]
        [Route("create")]
        public IActionResult CreateBenefit ([FromBody] BenefitDTO benefitDTO)
        {
            try
            {
                var benefit = _benefitService.CreateBenefit(benefitDTO);
                return Ok("Created");
            } catch(Exception)
            {
                return StatusCode(500, "Something went wrong.");
            }
        }

        [HttpPost]
        [Route("changestate")]
        public IActionResult ChangeBenefitState([FromBody] int Id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newBenefit =_benefitService.changeBenefitState(Id);
                return Ok("New benefit state is " + newBenefit.Active);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpDelete]
        [Route("delete")]
        public IActionResult Delete([FromBody] int id)
        {
            try
            {
                var deleted = _benefitService.DeleteBenefit(id);

                if (deleted == Messages.NotFound)
                    return NotFound("Program with the given ID: " + id + " does not exist");

                if (deleted == Messages.AccessDenied)
                    return StatusCode(401, "Can not delete programs that are in active state.");

                return Ok("Deleted benefit with ID: " + id);
            } catch(Exception)
            {
                return StatusCode(500, "Something went wrong");
            }
        }
    }
}
