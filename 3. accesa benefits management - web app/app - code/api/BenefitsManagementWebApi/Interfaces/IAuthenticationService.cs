using BenefitsManagementWebApi.DTOModels;
using SendGrid;
using System.Threading.Tasks;

namespace BenefitsManagementWebApi.Interfaces
{
    public interface IAuthenticationService
    {
        bool Login(LoginDTO credentials);
        void LockAccount(string email);
        int ChangePassword(ChangePasswordDTO data);
        Task<Response> ResetPassword(ChangePasswordDTO user);
    }
}
