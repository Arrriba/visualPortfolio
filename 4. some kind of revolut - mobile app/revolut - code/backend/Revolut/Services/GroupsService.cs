using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Revolut.Mapping;
using Revolut.Model;
using Revolut.Repositories;
using Revolut.Services;
using Revolut.DtoModels;
using Revolut.Interfaces.Repositories;

namespace Revolut.Services
{
    public class GroupsService : IGroupsService
    {
        private IGroupMapping _groupMapping;
        private IGroupsRepository _groupsRepository;
        private IUserRepository _userRepository;
        private IBillsRepository _billsRepository;


        public GroupsService(IGroupMapping groupMapping, IGroupsRepository groupsRepository, IUserRepository userRepository, IBillsRepository billsRepository)
        {
            _groupMapping = groupMapping;
            _groupsRepository = groupsRepository;
            _userRepository = userRepository;
            _billsRepository = billsRepository;

        }

        //se va crea doar cheia
        public void NewGroup(GroupKey groupKey)
        {
            var exists = _groupsRepository.AddGroup(groupKey.PhoneNumber, groupKey.Name);
            if (exists != null)
            {
                throw new Exception("Group with the same name and admin already exists!");
            }
        }

        public void DeleteGroup(GroupKey groupKey)
        {
            var exists = _groupsRepository.DeleteGroup(groupKey.PhoneNumber, groupKey.Name);
            if (exists == null)
            {
                throw new Exception("Group doesn't exist!");
            }
        }

        public void ChangeGroupName(DtoGroup dtoGroup, string newName)
        {
            var groupKey = _groupMapping.GetGroupKeyFromGroupDTO(dtoGroup);
            var newKey = new GroupKey(groupKey.PhoneNumber, newName);
            var exists = _groupsRepository.UpdateGroupKey(groupKey, newKey);
            if (exists == null)
            {
                throw new Exception("Group doesn't exist!");
            }
        }

        public IList<Group> GetGroups()
        {
            return _groupsRepository.GetAll();
        }

        public Group GetGroup(string name, string adminPhoneNumber)
        {
            var groupDto = new DtoGroup(name, adminPhoneNumber);
            return _groupMapping.GetGroupFromGroupDTO(groupDto);
        }
        public IList<Group> GetMyGroups(string adminPhoneNumber)
        {
            var x = _groupsRepository.GetAll();
            var y = x.Where(g => g.AdminPhoneNumber.Equals(adminPhoneNumber)).ToList();
            return y;
        }



        public IList<string> GetGroupDetails(string name, string phoneNumber)
        {
            var key_exists = _groupsRepository.GetGroupKey(phoneNumber, name);
            if (key_exists == null)
            {
                throw new NullReferenceException("This group does not exist!");
            }
            var group_members = _groupsRepository.GetGroupMembers(key_exists);
            IList<string> details = new List<string>();
            string nume = "Name: " + name;
            details.Add(nume);
            string admin = "Admin: " + _userRepository.GetUserByPhoneNumber(phoneNumber).FirstName + " " + _userRepository.GetUserByPhoneNumber(phoneNumber).LastName;
            details.Add(admin);
            string number = "No of members: " + group_members.Count.ToString();
            details.Add(number);
            return details;
        }

        //returneaza o lista de nume

        public IList<string> GetGroupsMembers(string name, string phoneNumber)
        {
            var groupKey = new GroupKey(phoneNumber, name);
            var gr_exists = _groupsRepository.GetGroupKey(groupKey.PhoneNumber, groupKey.Name);
            if (gr_exists == null)
            {
                throw new NullReferenceException("This group does not exist!");

            }
            var phone_list = _groupsRepository.GetGroupMembers(groupKey);
            if (phone_list.Count == 0)
            {
                throw new NullReferenceException("Empty group!");
            }
            var a = _userRepository.MapPhonesToNames(phone_list);
            return a;
        }
       
        public List<List<string>> Members(string name, string phoneNumber)
        {
            var groupKey = new GroupKey(phoneNumber, name);
            var gr_exists = _groupsRepository.GetGroupKey(groupKey.PhoneNumber, groupKey.Name);
            if (gr_exists == null)
            {
                throw new NullReferenceException("This group does not exist!");

            }
            var l = new List<List<string>>();

            var phone_list = _groupsRepository.GetGroupMembers(groupKey);
            foreach (String no in phone_list)
            {
                var us = _userRepository.GetUserByPhoneNumber(no);
                var l1 = new List<string>();
                l1.Add(us.FirstName + " " + us.LastName);
                l1.Add(us.PhoneNumber);
                l.Add(l1);
            }
            return l;
        }
       
        public void BeforeSplitBill(GroupKey g, double amount)

        {
            var group = _groupsRepository.GetGroup(g);
            var members = group.Users;


            members.Add(g.PhoneNumber);



            var no_members = group.Users.Count;

            float to_pay = (float)amount / (float)no_members;
            int not_fully_paying = 0;
            string names = null;
            foreach (string user_no in members)
            {
                var us = _userRepository.GetUserByPhoneNumber(user_no);
                var u = new UserLeftAmount();
                u.User = us;
                if (us.Amount < to_pay)
                {
                    not_fully_paying++;
                    names += us.FirstName + " " + us.LastName + ", ";
                }
                else
                {
                    u.Amount = to_pay;
                }
            }
            if (not_fully_paying != 0)
                throw new Exception("Users: " + names + "don't have enough money!");
            //return paying_list;
        }

        public string SplitBill(GroupKey g, double amount)

        {
            var group = _groupsRepository.GetGroup(g);
            var members = group.Users;

            var b = new Bill(g, amount);
            _billsRepository.AddBill(b);

            var no_members = group.Users.Count + 1;

            double to_pay = amount / no_members;

            //members.Add(g.PhoneNumber);
            _billsRepository.AddBillMemberAmount(members, b, to_pay);

            string pay = null;
            string names = null;
            foreach (string user_no in members)
            {
                var us = _userRepository.GetUserByPhoneNumber(user_no);
                var u = new UserLeftAmount();
                u.User = us;
                if (us.Amount < to_pay)
                {
                    names += us.FirstName + " " + us.LastName + ", ";
                }
                else
                {
                    u.Amount = to_pay;
                }
                pay = pay + u.User.FirstName + " " + u.User.LastName + ": " + to_pay.ToString() + '\n';

            }
          
            return pay;
        }

       public List<string> GetGroupPhones(GroupKey groupKey)
        {
            
            return _groupsRepository.GetGroupMembers(groupKey);
        }

        //return null daca nu exista grupul cu el ca admin
        public void AddToGroup(GroupAdd groupAdd)
        {
            var groupKey = _groupMapping.GetGroupKeyFromGroupAdd(groupAdd);
            var user_exists = _userRepository.GetUserByPhoneNumber(groupAdd.FriendPhoneNumber);
            if (user_exists == null)
            {
                throw new NullReferenceException("This user does not exist!");
            }
            var gr_exists = _groupsRepository.GetGroupKey(groupKey.PhoneNumber, groupKey.Name);
            if (gr_exists == null)
            {
                throw new NullReferenceException("You are not the admin of this group!");
            }
            var gr_members = _groupsRepository.GetGroupMembers(groupKey);
            if (gr_members.Contains(groupAdd.FriendPhoneNumber))
            {
                throw new NullReferenceException("Friend already in this group!");
            }
            if (groupAdd.PhoneNumber == groupAdd.FriendPhoneNumber)
            {
                throw new Exception("You have to type a friend's number!");
            }
            var group = _groupsRepository.AddToGroup(groupKey, groupAdd.FriendPhoneNumber);
        }

        public void RemoveFromGroup(GroupAdd groupAdd)
        {
            var groupKey = _groupMapping.GetGroupKeyFromGroupAdd(groupAdd);
            var user_exists = _userRepository.GetUserByPhoneNumber(groupAdd.FriendPhoneNumber);
            if (user_exists == null)
            {
                throw new NullReferenceException("This user does not exist!");
            }
            var gr_exists = _groupsRepository.GetGroupKey(groupKey.PhoneNumber, groupKey.Name);
            if (gr_exists == null)
            {
                throw new NullReferenceException("You are not the admin of this group!");
            }
            var gr_members = _groupsRepository.GetGroupMembers(groupKey);
            if (!gr_members.Contains(groupAdd.FriendPhoneNumber))
            {
                throw new NullReferenceException("User not in this group!");
            }
            if (groupAdd.PhoneNumber == groupAdd.FriendPhoneNumber)
            {
                throw new Exception("You have to type a friend's number!");
            }
            var group = _groupsRepository.RemoveFromGroup(groupKey, groupAdd.FriendPhoneNumber);
        }

        
    }
}


