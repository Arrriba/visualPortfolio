using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Revolut.DtoModels;
using Revolut.Model;

namespace Revolut.DtoModels
{
    public class BillPayReport
    {
        public BillPayReport()
        {
        }
        public IList<UserLeftAmount> Users { get; set; }
        public bool Even { get; set; }
    }
}
