using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BenefitsManagementWebApi.DTOModels;
using BenefitsManagementWebApi.Interfaces;
using AutoMapper;
using BenefitsManagementWebApi.Model;
using SendGrid;
using SendGrid.Helpers.Mail;


namespace BenefitsManagementWebApi.Services
{
    public class AuthenticationService:IAuthenticationService
    {
        private IUserRepository _userRepository;
        private IMapper _iMapper;

        public DateTime unlocked = DateTime.MinValue.AddYears(1800);
        DateTime locked = DateTime.MinValue.AddYears(1800).AddDays(1);

        public AuthenticationService(IUserRepository userRepository, IMapper iMapper)
        {
            _userRepository = userRepository;
            _iMapper = iMapper;
        }

        public string GeneratePassword()
        {
            //var passwordRequirements = new PasswordGenerator(Digit, Uppercase, Lowercase, NonAlphanumeric, UniqueChars, Length);

            string[] randomChars = new[]
            {
            "ABCDEFGHJKLMNOPQRSTUVWXYZ",    // uppercase 
            "abcdefghijkmnopqrstuvwxyz",    // lowercase
            "0123456789",                   // digits
            "!@$?_-"                        // non-alphanumeric
            };

            Random rand = new Random(Environment.TickCount);
            List<char> chars = new List<char>();


            chars.Insert(rand.Next(0, chars.Count),
                randomChars[0][rand.Next(0, randomChars[0].Length)]);


            chars.Insert(rand.Next(0, chars.Count),
                randomChars[1][rand.Next(0, randomChars[1].Length)]);


            chars.Insert(rand.Next(0, chars.Count),
                randomChars[2][rand.Next(0, randomChars[2].Length)]);


            chars.Insert(rand.Next(0, chars.Count),
                randomChars[3][rand.Next(0, randomChars[3].Length)]);

            for (int i = chars.Count; i < 8
                || chars.Distinct().Count() < 4; i++)
            {
                string rcs = randomChars[rand.Next(0, randomChars.Length)];
                chars.Insert(rand.Next(0, chars.Count),
                    rcs[rand.Next(0, rcs.Length)]);
            }

            return new string(chars.ToArray());

        }

        public int ChangePassword(ChangePasswordDTO data)
        {
            int workFactor = 10;
            var user = _userRepository.GetUser(data.Email);
            var initialUser = user;
            var checkPassword = BCrypt.Net.BCrypt.HashPassword(data.OldPassword);
            var generateSalt = BCrypt.Net.BCrypt.GenerateSalt(workFactor);
            var hashNewPassword = BCrypt.Net.BCrypt.HashPassword(data.NewPassword);
            if (BCrypt.Net.BCrypt.Verify(data.OldPassword, initialUser.Password) || initialUser.Password == data.OldPassword)
            {
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(data.NewPassword);
                _userRepository.ChangePassword(initialUser, hashedPassword);
                //_userRepository.UpdateSalt(initialUser.Email, generateSalt);

                return 200;
            }
            else if (BCrypt.Net.BCrypt.Verify(data.NewPassword, initialUser.Password))
            {
                return 401;
            }
            else
            {
                return 402;
            }

        }

        public bool Login (LoginDTO credentials)
        {
            User loginUser = new User() ;
            loginUser.Email = credentials.Email;
            loginUser.Password = credentials.Password;

            var now = DateTime.Now;
            
            User dbUser = _userRepository.GetUser(loginUser.Email);


            if (dbUser == null) throw new NullReferenceException("User does not exist!");

            if (dbUser.ExpirationDate != unlocked)
            {
                if (dbUser.ExpirationDate == locked) throw new AccessViolationException("Account is locked!");
                if (now.CompareTo(dbUser.ExpirationDate) > 0) throw new TimeoutException("Account password expired!");
            }
            if (!BCrypt.Net.BCrypt.Verify(credentials.Password, dbUser.Password)) return false;

            return true;
        }

        public async Task<Response>GenerateBatchId()
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var response = await client.RequestAsync(method: SendGridClient.Method.POST, urlPath: "mail/batch");

            Console.WriteLine(response.StatusCode);
            Console.WriteLine(response.Body.ReadAsStringAsync().Result);
            Console.WriteLine(response.Headers.ToString());

            return response;
        }

        public async Task<string>ValidateBatchId()
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var batch_id = GenerateBatchId();
            var response = await client.RequestAsync(method: SendGridClient.Method.GET, urlPath: "mail/batch/" + batch_id);

            return response.Body.ReadAsStringAsync().Result;
        }

        public async Task<Response> ResetPassword(ChangePasswordDTO user)
        {

            var generatePassword = GeneratePassword();

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(generatePassword);

            _userRepository.ResetPassword(user, hashedPassword);

            var newPassword = generatePassword;

            var generateBatchResponse = await GenerateBatchId();

            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("valentin.lazureanu@accesa.eu", "Accesa Benefits Management");
            var subject = "Password reset request";
            var to = new EmailAddress(user.Email);
            var plainTextContent = "<strong>Your new password is " + newPassword + "</br>" +
                "It will expire in 24 hours, so remember to change it when you log in!</strong>";
            var htmlContent = plainTextContent;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

            return response;
        }

        public void LockAccount(string email)
        {
            var dbUser = _userRepository.GetUser(email);
            if (dbUser == null) throw new NullReferenceException("User does not exist!");
            dbUser.ExpirationDate = locked;

            _userRepository.Update(dbUser);
        }
    }
}
