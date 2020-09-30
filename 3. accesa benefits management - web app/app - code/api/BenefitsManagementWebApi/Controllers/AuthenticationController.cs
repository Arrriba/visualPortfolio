using System;
using System.Threading.Tasks;
using BenefitsManagementWebApi.DTOModels;
using BenefitsManagementWebApi.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BenefitsManagementWebApi.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private IAuthenticationService _authenticationService;
        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        // POST: api/authentication/login
        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody]LoginDTO  credentials)
        {

            //return Ok(_authenticationService.LoginTest(credentials));
            try
            {
                // 200 - login accepted
                if (_authenticationService.Login(credentials)) return Ok();
                // 401 - Wrong password
                return StatusCode(401, "Wrong credentials!");
            }
            catch(NullReferenceException e)
            {
                // 404 - Email does not exist
                return NotFound( e.Message);
            }
            catch (AccessViolationException e)
            {
                // 423 -Account is locked
                return StatusCode(423, e.Message);
            }
            catch (TimeoutException e)
            {
                // 403 - Password expired
                return StatusCode(403,e.Message);
            }
            catch (Exception)
            {
                //Unexpected error
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        [Route("lock")]
        public IActionResult LockAccount([FromBody] string email)
        {
            try
            {
                _authenticationService.LockAccount(email); 
                return Ok();
            }
            catch (NullReferenceException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message + " and the current date is: " + DateTime.MinValue.ToString());
                return StatusCode(500,"Unexpected Error");
            }
            
        }

        // POST: api/authentication/changepassword
        [HttpPost]
        [Route("changepassword")]
        public IActionResult ChangePassword([FromBody] ChangePasswordDTO user)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {

                var result = _authenticationService.ChangePassword(user);

                if (result == 200)
                    return Ok("Password changed successfully");
                else if (result == 401)
                {
                    return StatusCode(401, "Passwords do not match");
                }
                else if (result == 402)
                {
                    return BadRequest("New password must be different from the old one");
                }
                else
                {
                    return BadRequest("Something went wrong");
                }
            }
            catch(NullReferenceException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        // POST: api/authentication/resetpassword
        [HttpPost]
        [Route("resetpassword")]
        public async Task<IActionResult> ResetPassword([FromBody]  ChangePasswordDTO user)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var response = await _authenticationService.ResetPassword(user);

            return Ok(response.StatusCode);
        }
    }
}
