using Revolut.Model;
using System.Collections.Generic;
using Revolut.DtoModels;

namespace Revolut.Services
{
    public interface IUserService
    {
        IList<User> GetUsers();
        int GetBalance(string phoneNumber);
        void AddUser(CreateUserDto user);
        void TopUp(string phoneNumber, int amount);
        void ChangeTopUp(string phoneNumber, double amount);

        void Transfer(TransferModel t);
        void Pay(PayModel payModel);
        List<string> MapPhonesToNames(List<string> l);
        List<BillModel> GetUnpayedUserBills(string phoneNumber);
        void PayPendingModel(BillModel billModel);

        User GetUserByPhone(string phoneNumber);
        double GetUserChange(string PhoneNumber);

        List<BillModel> WhoOwesMe(string phoneNumber);

        IList<User> GetUserByName(string firstName, string lastName);
    }
}
