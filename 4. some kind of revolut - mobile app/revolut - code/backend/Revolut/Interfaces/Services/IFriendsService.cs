using System.Collections.Generic;
using System;
using Revolut.Model;
using Revolut.DtoModels;


namespace Revolut.Services
{
    public interface IFriendsService
    {
        IList<string> GetAll(string phone);
        List<List<string>> GetAllNamesPhones(string phone);

        void AddFriend(AddFriendModel add);
    }
}