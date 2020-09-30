using System;
using BenefitsManagementWebApi.DTOModels;
using BenefitsManagementWebApi.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BenefitsManagementWebApi.Controllers
{
    [Route("api/areas")]
    [ApiController]
    public class AreaController : ControllerBase
    {
        IAreaService _areaService;
        IAreaRepository _areaRepository;

        public AreaController(IAreaService areaService, IAreaRepository areaRepository)
        {
            _areaService = areaService;
            _areaRepository = areaRepository;
        }

        [HttpPost]
        [Route("createarea")]
        public IActionResult CreateArea([FromForm] AreaDTO area)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var createdArea = _areaRepository.SaveArea(area);

                _areaRepository.InsertLogoURL(area, _areaService.uploadFile(area.Logo));
                _areaRepository.InsertIconURL(area, _areaService.uploadFile(area.Icon));

                return Ok(createdArea);
            }
            catch (NullReferenceException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("updatearea/{id}")]
        public IActionResult updateArea(int id, [FromForm] AreaDTO newArea)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            try
            {
                var oldArea =_areaRepository.Get(id);
                _areaService.UpdateArea(id, newArea);
                if(newArea.Logo != null || oldArea.Logo == null )
                {
                    _areaRepository.InsertLogoURL(newArea, _areaService.uploadFile(newArea.Logo));
                }
                if (newArea.Icon != null || oldArea.Icon == null)
                {
                    _areaRepository.InsertIconURL(newArea, _areaService.uploadFile(newArea.Icon));
                }


                return Ok("Updated area successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /*[HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id)
        {

            try
            {
                var area = _areaService.GetArea(id);
                return Ok(area);
            }
            catch( NullReferenceException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception )
            { 
                //return StatusCode(500, e.Message);
                return StatusCode(500,"Unexpected error!");
            }
        }
        */

        // GET: api/Areas/5
        [HttpGet]
        public IActionResult Get()
        {
            //select all areas froma db

            try
            {
                var areas = _areaService.GetAreas();
                return Ok(areas);
            }
            catch (Exception)
            {

                return StatusCode(500, "Unexpected error!");
            }

        }
        

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _areaService.RemoveArea(id);
                return Ok();
            }
            catch(NullReferenceException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Unexpected error!");
            }

        }
    }
}
