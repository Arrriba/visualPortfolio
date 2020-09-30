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
    [Route("api/groups")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private IGroupsService _groupsService;

        public GroupsController(IGroupsService groupsService)
        {
            _groupsService = groupsService;
        }

        [HttpGet()]
        public IActionResult GetGroups()
        {
            var g = _groupsService.GetGroups();
            return Ok(g);
        }

        [HttpGet("{adminPhoneNumber}")]
        public IActionResult GetMyGroups(string adminPhoneNumber)
        {
            var g = _groupsService.GetMyGroups(adminPhoneNumber);
            return Ok(g);
        }

        [HttpGet("{name}/{adminPhoneNumber}")]
        public IActionResult GetGroup(string name,string adminPhoneNumber)
        {
            var g = _groupsService.GetGroup(name,adminPhoneNumber) ;
            return Ok(g);
        }

        [HttpPost()]
        [Route("new")]
        public IActionResult NewGroup([FromBody]GroupKey groupKey)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                _groupsService.NewGroup(groupKey);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete()]
        [Route("delete")]
        public IActionResult DeleteGroup([FromBody]GroupKey groupKey)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                _groupsService.DeleteGroup(groupKey);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("You are not the admin of this group!");
            }
        }

        [HttpPut()]
        [Route("name/{newName}")]
        public IActionResult ChangeGroupName([FromBody]DtoGroup dtoGroup,string newName)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                _groupsService.ChangeGroupName(dtoGroup, newName);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("You are not the admin of this group!");
            }
        }
        /*
        [HttpPost()]
        [Route("splitbill/{amount}")]
        public IActionResult BeforeSplitBill([FromBody]GroupKey groupKey,double amount)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                _groupsService.BeforeSplitBill(groupKey, amount);
                return Ok(_groupsService.SplitBill(groupKey, amount));

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        */
        [HttpPost()]
        [Route("verifySplit/{amount}")]
        public IActionResult BeforeSplitBill([FromBody]GroupKey groupKey, double amount)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                _groupsService.BeforeSplitBill(groupKey, amount);
                return Ok();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost()]
        [Route("split/{amount}")]
        public IActionResult Split([FromBody]GroupKey groupKey, double amount)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            //return Ok();
              return Ok(_groupsService.SplitBill(groupKey, amount));
        }
        
        [HttpPost()]
        [Route("add")]
        public IActionResult AddToGroup([FromBody]GroupAdd groupAdd)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                _groupsService.AddToGroup(groupAdd);
                return Ok();
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

        [HttpPost()]
        [Route("phones")]
        public IActionResult GetGroupPhones([FromBody]GroupKey groupKey)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(_groupsService.GetGroupPhones(groupKey));
        }

        [HttpDelete()]
        [Route("remove")]
        public IActionResult RemoveFromGroup([FromBody]GroupAdd groupAdd)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                _groupsService.RemoveFromGroup(groupAdd);
                return Ok();
            }
            catch (NullReferenceException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        /*
        [HttpGet()]
        [Route("members/{name}/{admin}")]
        public IActionResult GetGroupsMembers(string name,string admin)
        {
            
            try
            {
                var names_list = _groupsService.GetGroupsMembers(name,admin);
                return Ok(names_list);

            }
            catch (NullReferenceException e)
            {
                return NotFound(e.Message);
            }

        }
        */
        [HttpGet()]
        [Route("members/{name}/{admin}")]
        public IActionResult GetGroupsMembers(string name, string admin)
        {

            try
            {
                var names_list = _groupsService.Members(name, admin);
                return Ok(names_list);

            }
            catch (NullReferenceException e)
            {
                return NotFound(e.Message);
            }

        }

        [HttpGet("details/{name}/{phoneNumber}")]
        public IActionResult GetGroupDetails(string name, string phoneNumber)
        {
            try
            {
                var details = _groupsService.GetGroupDetails(name, phoneNumber);
                return Ok(details);
            }
            catch (NullReferenceException e)
            {
                return NotFound(e.Message);
            }
        }

        

        /*
        
        [HttpPost("friends")]
        public IActionResult GetFriendss([FromBody]string phoneNumber)
        {
            var user = _userService.GetFriendsNames(phoneNumber);
            if (user.Count == 0)
                return BadRequest("Your friends list is empty!");

            return Ok(user);

        }


        [HttpPost()]
        [Route("friends/add")]
        public IActionResult AddFriend([FromBody]AddFriendModel m)
        {
            if (m.PhoneNumber.Equals(m.TargetPhoneNumber))
                return BadRequest("Type your friend's number!");
            var user = _userService.GetUserByPhone(m.PhoneNumber);

            if (user == null)
            {
                return BadRequest("This user does not exist.");
            }

            var targetUser = _userService.GetUserByPhone(m.TargetPhoneNumber);
            if (targetUser == null)
            {
                return BadRequest("The other user does not exist.");
            }
            //aici va returna daca pritetenul exista deja in lista
            var a = _userService.AddFriend(m.PhoneNumber, m.TargetPhoneNumber);
            if (a != null)
                return BadRequest("Friend already added!");
            return Ok();
        }

        
        [HttpDelete()]
        [Route("groups/delete")]
        public IActionResult DeleteGroup([FromBody]GroupKey g)
        {
            var x = _groupsService.DeleteGroup(g.PhoneNumber, g.Name);
            if (x)
                return Ok();
            else return BadRequest("You are not the admin of this group!");
        }

        //daca vr sa adaug pe cineva in grup si nu il am la prieteni 
        //il adauga automat si la prieteni
        

        */
    }
}