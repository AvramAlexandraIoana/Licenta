using Org.BouncyCastle.Asn1.Mozilla;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebFMI.Models
{
    public class Contact
    {
        [Key]
        public int ContactId { get; set; }

        public string ContactName { get; set; }
        public string PhoneNumber { get; set; }

        public DateTime CreatedOn { get; set; }

        public int UserId { get; set; }

        public virtual User User { get; set; }

         
    }
}
