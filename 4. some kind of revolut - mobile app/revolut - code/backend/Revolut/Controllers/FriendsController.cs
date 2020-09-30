using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Revolut.DtoModels;
using Revolut.Interfaces.Repositories;
using Revolut.Model;
using Revolut.Services;
using Revolut.Repositories;


namespace Revolut.Controllers
{
    [Route("api/friends")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private IFriendsService _friendsService;

        public FriendsController(IFriendsService friendsService)
        {
            _friendsService = friendsService;
        }

        [HttpPost()]
        [Route("add")]
        public IActionResult AddFriend([FromBody]AddFriendModel add)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                _friendsService.AddFriend(add);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        
        [HttpGet()]
        [Route("{phone}")]
        public IActionResult GetFriends(string phone)
        {

            try
            {
                //var names_list = _friendsService.GetAll(phone);
                var names_list = _friendsService.GetAllNamesPhones(phone);
                return Ok(names_list);

            }
            catch (NullReferenceException e)
            {
                return NotFound(e.Message);
            }

        }

    }
}