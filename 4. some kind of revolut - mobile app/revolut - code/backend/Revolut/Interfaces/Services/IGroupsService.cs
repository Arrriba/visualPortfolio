using System.Collections.Generic;
using System;
using Revolut.Model;
using Revolut.DtoModels;

namespace Revolut.Services
{
    public interface IGroupsService
    {
        IList<Group> GetGroups();
        IList<Group> GetMyGroups(string adminPhoneNumber);
        //IList<UserLeftAmount> GetUsersPartiallyPaying(GroupKey g, int amount);
        //IList<UserLeftAmount> SplitBill(GroupKey g, int amount);
        void BeforeSplitBill(GroupKey g, double amount);
        string SplitBill(GroupKey g, double amount);
        List<string> GetGroupPhones(GroupKey groupKey);



        Group GetGroup(string name, string adminPhoneNumber);
        void NewGroup(GroupKey g);
        void DeleteGroup(GroupKey g);
        void ChangeGroupName(DtoGroup g,string newName);
        void RemoveFromGroup(GroupAdd groupAdd);
        void AddToGroup(GroupAdd g);


        IList<string> GetGroupDetails(string name,string phoneNumber);
        IList<string> GetGroupsMembers(string name,string phoneNumber);
        //Dictionary<string,string> Members(string name, string phoneNumber);
        List<List<string>> Members(string name, string phoneNumber);

    }
}