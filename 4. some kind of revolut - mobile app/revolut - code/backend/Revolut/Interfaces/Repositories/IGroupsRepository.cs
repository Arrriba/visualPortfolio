using Revolut.DtoModels;
using Revolut.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Revolut.Repositories
{
    public interface IGroupsRepository
    {
        IList<Group> GetAll();
        GroupKey GetGroupKey(string phoneNumber,string name);
        Group GetGroup(GroupKey groupKey);

        List<string> GetGroupMembers(GroupKey groupKey);

        Group RemoveFromGroup(GroupKey groupKey, string friendPhoneNumber);

        GroupKey AddGroup(string phoneNumber, string name);
        GroupKey DeleteGroup(string phoneNumber, string name);
        Group UpdateGroup(Group g);
        GroupKey UpdateGroupKey(GroupKey old,GroupKey newK);
        Group AddToGroup(GroupKey groupKey, string friendPhoneNumber);


    }
}