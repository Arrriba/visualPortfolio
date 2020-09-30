using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Revolut.Model;

namespace Revolut.Interfaces.Repositories
{
    public interface IBillsRepository
    {
        // Bill GetBill(string )
        Bill AddBill(Bill bill);
        IList<GroupBill> GetAllBills();
        GroupBill GetGroupBill(int id);
        void AddBillMemberAmount(List<string> phonesList,Bill bill, double amount);
        GroupBill GetBill(Bill bill);
        List<BillModel> GetUserBills(string phoneNumber);
        List<BillModel> GetUnpayedUserBills(string phoneNumber);
        void UpdateBill(BillModel billModel);
        BillModel GetBillById(int id);
        List<BillModel> GetBillModels();
    }
}
