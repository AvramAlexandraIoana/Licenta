using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebFMI.Models
{
    public class Wallet
    {
        public virtual ICollection<Transaction> Transactions { get; set; }
        public virtual ICollection<CategoryTransaction> CategoryTransactions { get; set; }


    }
}
