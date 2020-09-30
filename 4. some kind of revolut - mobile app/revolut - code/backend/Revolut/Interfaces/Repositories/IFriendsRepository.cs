using System.Collections.Generic;
using System;
using Revolut.Model;
using Revolut.DtoModels;



namespace Revolut.Repositories
{
    public interface IFriendsRepository
    {
        List<string> GetAll(string phone);
        void AddFriend(string adminPhone, string friendPhone);
    }
}