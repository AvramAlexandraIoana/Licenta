using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebFMI.Models
{
    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }


        [Required(ErrorMessage = "Suma tranzactiei este obligatorie")]
        public int Value { get; set; }

        [Required(ErrorMessage = "Descrierea  este obligatorie")]
        public string Description { get; set; }


        [DataType(DataType.DateTime, ErrorMessage = "Campul trebuie sa contina data si ora")]
        public DateTime Date { get; set; }

        public string Unit { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }
        public int UserId1 { get; set; }

        public string UserName { get; set; }

        public string ImageUrl { get; set; }

        public bool IsSend { get; set; }


    }
}
