using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebFMI.Models
{
    public class CategoryTransaction
    {
        [Key]
        public int CategoryTransactionId { get; set; }


        [Required(ErrorMessage = "Suma tranzactiei este obligatorie")]
        public int Value { get; set; }

        [Required(ErrorMessage = "Descrierea  este obligatorie")]
        public string Description { get; set; }


        [Required(ErrorMessage = "Categoria este obligatorie")]
        public int CategoryId { get; set; }

        public string CategoryName { get; set; }

        public DateTime TransactionDate { get; set; }

        public string Unit { get; set; }

        public virtual Category Category { get; set; }

        //public ICollection<Category> Categories { get; set; }


        public int UserId { get; set; }
        public virtual User User { get; set; }

        public string UserName { get; set; }

        public string ImageUrl { get; set; }








    }
}
