using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebFMI.Models
{
    public class Account
    {
        [Key]
        public int AccountId { get; set; }

        public string Iban { get; set; }
        public string AccountNumber { get; set; }

        public string CardHolderName { get; set; }

        public string ExpiryDate { get; set; }

        public string SecurityCode { get; set; }

        public string Conversion { get; set; }

        public int UserId { get; set; }


        public virtual User User { get; set; }

       
    }
}
