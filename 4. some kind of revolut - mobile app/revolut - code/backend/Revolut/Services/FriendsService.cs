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
    public class FriendsService : IFriendsService
    {
        //private IGroupMapping _groupMapping;
        private IFriendsRepository _friendsRepository;
        private IUserRepository _userRepository;

        public FriendsService(IFriendsRepository friendsRepository,IUserRepository userRepository)
        {
            _friendsRepository = friendsRepository;
            _userRepository = userRepository;
        }
        
        public IList<string> GetAll(string phone)
        {

            var friendsPhones = _friendsRepository.GetAll(phone);
            if (friendsPhones.Count == 0)
            {
                throw new NullReferenceException("You'd better start making friends around here!!");
            }
            var friendsNames = _userRepository.MapPhonesToNames(friendsPhones);
            return friendsNames;
        }

        public List<List<string>> GetAllNamesPhones(string phone)
        {
            var friendsPhones = _friendsRepository.GetAll(phone);
            if (friendsPhones.Count == 0)
            {
                throw new NullReferenceException("You'd better start making friends around here!!");
            }
            var l = new List<List<string>>();
            foreach(String u in friendsPhones)
            {
                var us = _userRepository.GetUserByPhoneNumber(u);
                var l1 = new List<string>();
                l1.Add(us.FirstName + " " + us.LastName);
                l1.Add(us.PhoneNumber);
                l.Add(l1);
            }
            //var fr = _userRepository.MapPhonesToNamesDict(friendsPhones);
            return l;
        }

        public void AddFriend(AddFriendModel addModel)
        {
            var exists = _userRepository.GetUserByPhoneNumber(addModel.TargetPhoneNumber);
            if (exists == null)
            {
                throw new Exception("User not found!");
            }
            var friendsList = _friendsRepository.GetAll(addModel.PhoneNumber);
            if (friendsList.Contains(addModel.TargetPhoneNumber))
            {
                throw new Exception("Friend already in the list!");
            }
            _friendsRepository.AddFriend(addModel.PhoneNumber, addModel.TargetPhoneNumber);

        }
    }
}


