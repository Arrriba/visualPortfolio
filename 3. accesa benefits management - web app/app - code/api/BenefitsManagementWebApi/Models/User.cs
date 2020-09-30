using System;
using System.ComponentModel.DataAnnotations;

namespace BenefitsManagementWebApi.Model
{
    public class User
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string PasswordSalt { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
