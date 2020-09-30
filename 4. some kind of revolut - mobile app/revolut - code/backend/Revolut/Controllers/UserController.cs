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
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpGet()]
        public IActionResult GetUsers()
        {
            var users = _userService.GetUsers();
            return Ok(users);
        }
        
        [HttpPost()]
        [Route("register")]

        public IActionResult AddUser([FromBody] CreateUserDto user)
        {
             if (!ModelState.IsValid)
              return BadRequest(ModelState);

            try
            {
                _userService.AddUser(user);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
            return Ok();
        }

        [HttpGet()]
        [Route("{phoneNumber}")]
        public IActionResult GetBalance(string phoneNumber)
        {
            try
            {
                var a = _userService.GetBalance(phoneNumber);
                return Ok(a);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }
        
        [HttpPut()]
        [Route("pay")]
        public IActionResult Pay([FromBody]PayModel payModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                _userService.Pay(payModel);
                return Ok();
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpPut()]
        [Route("payPending")]
        public IActionResult PayPendingBill([FromBody]BillModel billModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                _userService.PayPendingModel(billModel);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpGet()]
        [Route("change/{phoneNumber}")]
        public IActionResult GetChange(string phoneNumber)
        {
            try
            {
                var change = _userService.GetUserChange(phoneNumber);
                return Ok(change);
            }
            
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet()]
        [Route("whoOwes/{phoneNumber}")]
        public IActionResult GetWhoOwesMe(string phoneNumber)
        {
            try
            {
                var l = _userService.WhoOwesMe(phoneNumber);
                return Ok(l);
            }

            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet()]
        [Route("bill/{phoneNumber}")]
        public IActionResult GetUnpayedBill(string phoneNumber)
        {
            try
            {
                var change = _userService.GetUnpayedUserBills(phoneNumber);
                return Ok(change);
            }

            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut()]
        [Route("transaction/{phoneNumber}/topup")]
        public IActionResult TopUp(string phoneNumber, [FromBody]int amount)
        {
            try
            {
                _userService.TopUp(phoneNumber,amount);
                return Ok();
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }

        }
        [HttpPut()]
        [Route("change/{phoneNumber}/topup")]
        public IActionResult ChangeTopUp(string phoneNumber, [FromBody]double amount)
        {
            try
            {
                _userService.ChangeTopUp(phoneNumber, amount);
                return Ok();
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }

        }

        [HttpPost()]
        [Route("login")]
        public IActionResult Login([FromBody] User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
               _userService.GetUserByPhone(user.PhoneNumber);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
            var u = _userService.GetUserByPhone(user.PhoneNumber);

            if (!u.Password.Equals(user.Password, StringComparison.InvariantCulture))
            {
                return BadRequest("The password is not correct.");
            }

            return Ok(u);
        }

        [HttpPost()]
        [Route("transaction/transfer")]
        public IActionResult Transfer([FromBody] TransferModel transfer)
        {
            try
            {
                _userService.Transfer(transfer);
                return Ok();
            }
            catch (NullReferenceException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
       
    }
}