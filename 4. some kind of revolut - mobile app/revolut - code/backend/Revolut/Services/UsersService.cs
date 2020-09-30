using System;
using Revolut.Model;
using System.Collections.Generic;
using System.Linq;
using Revolut.DtoModels;
using Revolut.Mapping;
using Revolut.Repositories;
using Revolut.Interfaces.Repositories;

namespace Revolut.Services
{
    public class UsersService : IUserService
    {
        private IUserMapping _userMapping;
        private IUserRepository _userRepository;
        private IBillsRepository _billsRepository;

        public UsersService(IUserMapping userMapping,IUserRepository userRepository,IBillsRepository billsRepository)
        {
            _userMapping = userMapping;
            _userRepository = userRepository;
            _billsRepository = billsRepository;
        }

        public void AddUser(CreateUserDto user)
        {
            var u = _userMapping.GetUserFromCreateUserDTO(user);

            var a = _userRepository.AddUser(u);
            

            if (a == null)
            {
                throw new Exception("User with this phone number already exists!");
            }
            //else this.TopUp(user.PhoneNumber, user.Amount);

        }
        
       
        public void Pay(PayModel payModel)
        {
            var user = _userRepository.GetUserByPhoneNumber(payModel.PhoneNumber);
            if (user.Amount < payModel.Amount)
            {
                throw new Exception("Not enough money! Top up first.");
            }
            else

            {
                if (payModel.Amount-(int)payModel.Amount!=0)
                {
                    double x = Math.Ceiling(payModel.Amount);
                    double change = x - payModel.Amount;
                    _userRepository.AddToUserPocket(payModel.PhoneNumber, change);
                }

                //user.Amount = user.Amount - (int)Math.Ceiling(payModel.Amount);
                //_userRepository.UpdateUser(user);
                var l = new List<string>();
                l.Add(user.PhoneNumber);
                var b = new Bill(new GroupKey("11","213"), payModel.Amount);
                _billsRepository.AddBill(b);

                _billsRepository.AddBillMemberAmount(l, b, payModel.Amount);

            }
        }



        public List<BillModel> WhoOwesMe(string phoneNumber)
        {
            var b = _billsRepository.GetBillModels();
            var list = new List<BillModel>();
            foreach (BillModel bb in b)
            {
                var bill = _billsRepository.GetGroupBill(bb.IdBill);
                if (bill.AdminPhoneNumber == phoneNumber && bb.Payed==0)
                {
                    list.Add(bb);
                }
            }
            return list;
        }

        public double GetUserChange(string PhoneNumber)
        {
            return _userRepository.GetUserChange(PhoneNumber);
        }

        public User GetUserByPhone(string phoneNumber)
        {
            var user = _userRepository.GetUserByPhoneNumber(phoneNumber);
            if (user == null)
            {
                throw new Exception("This user does not exist!");
            }
            return user;
        }

        public int GetBalance(string phoneNumber)
        {
            var user = _userRepository.GetUserByPhoneNumber(phoneNumber);
            if (user == null)
            {
                throw new Exception("User not found!");
            }
            return user.Amount;
        }

        public void TopUp(string phoneNumber, int amount)
        {
            var u2 = _userRepository.GetUserByPhoneNumber(phoneNumber);
            if (u2 == null)
            {
                throw new Exception("User not found!");
            }
            u2.Amount += amount;
            _userRepository.UpdateUser(u2);
        }
        public void ChangeTopUp(string phoneNumber, double amount)
        {
            var u2 = _userRepository.GetUserByPhoneNumber(phoneNumber);
            double newAm = Math.Floor(amount);
            u2.Amount += (int)newAm;
            double ch = amount - (int)amount;
            if(amount!=0)
            _userRepository.SetUserPocket(phoneNumber, ch);
            _userRepository.UpdateUser(u2);
        }

        public List<BillModel> GetUnpayedUserBills(string phoneNumber)
        {

            var x = _billsRepository.GetUnpayedUserBills(phoneNumber);
            return x;
        }

        public void PayPendingModel(BillModel billModel)
        {
            var p = new PayModel();
            p.PhoneNumber = billModel.PhoneNumber;
            p.Amount = billModel.Amount;
            //Pay(p);

            var user = _userRepository.GetUserByPhoneNumber(p.PhoneNumber);
            if (user.Amount < p.Amount)
            {
                throw new Exception("Not enough money! Top up first.");
            }
            else

            {
                if (p.Amount - (int)p.Amount != 0)
                {
                    double x = Math.Ceiling(p.Amount);
                    double change = x - p.Amount;
                    _userRepository.AddToUserPocket(p.PhoneNumber, change);
                }
                user.Amount = user.Amount - (int)Math.Ceiling(p.Amount);
                _userRepository.UpdateUser(user);
                _billsRepository.UpdateBill(billModel);
            }
        }

        public void Transfer(TransferModel transfer)
        {
            var from_user = _userRepository.GetUserByPhoneNumber(transfer.PhoneNumber);

            var to_user = _userRepository.GetUserByPhoneNumber(transfer.TargetPhoneNumber);

            //from_user is the number of the logged in user, we assume it's already been validated
            if (to_user == null)
            {
                throw new NullReferenceException("User not found!");
            }
            if (from_user.Amount >= transfer.Amount)
            {
                from_user.Amount -= transfer.Amount;
                to_user.Amount += transfer.Amount;
                _userRepository.UpdateUser(from_user);
                _userRepository.UpdateUser(to_user);
            }
            else throw new Exception("Not enough money!");
        }

       
        public IList<User> GetUserByName(string firstName, string lastName)
        {
            return _userRepository.GetAll().Where(u => u.FirstName == firstName || u.LastName == lastName).ToList();
        }

        public List<string> MapPhonesToNames(List<string> l)
        {
            var a = _userRepository.GetAll().Where(u => l.Contains(u.PhoneNumber));
            var x = a.Select(u => u.FirstName + " " + u.LastName).ToList();
            return x;
        }

        public List<string> GetNamesFromUsers(List<User> l)
        {
            var x = l.Select(u => u.FirstName + " " + u.LastName).ToList();
            return x;
        }

        public IList<User> GetUsers()
        {
            var x = _userRepository.GetAll();
            return x;
        }
        
        
        
    }
}
