using BenefitsManagementWebApi.DTOModels;
using BenefitsManagementWebApi.Model;
using System;

namespace BenefitsManagementWebApi.Interfaces
{
    public interface IUserRepository
    {
        User GetUser(string Email);
        void UpdateSalt(string Email, string passwordSalt);
        string ChangePassword(User user, string Password, DateTime setDate = new DateTime());
        string ResetPassword(ChangePasswordDTO user, string newPassword, DateTime setDate = new DateTime());

        void Update(User user);
    }
}
