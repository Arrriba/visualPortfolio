using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Revolut.Model;

namespace Revolut.Interfaces.Repositories
{
    public interface IUserRepository
    {
        IList<User> GetAll();
        User GetUserByPhoneNumber(string no);
        User GetUserByName(string firstName, string lastName);
        User UpdateUser(User user);
        User AddUser(User user);
        IList<string> MapPhonesToNames(IList<string> l);
        Dictionary<string, string> MapPhonesToNamesDict(IList<string> l);
        void AddToUserPocket(string phoneNumber,double amount);
        double GetUserChange(string phoneNumber);
        void SetUserPocket(string phoneNumber, double amount);
       // void NewExpense(string phoneNumber, double amount);

    }
}
