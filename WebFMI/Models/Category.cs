using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebFMI.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }

        [Required(ErrorMessage = "Denumirea categoriei este obligatorie")]
        public string CategoryName { get; set; }


        [Required(ErrorMessage = "Url-ul categoriei este obligatoriu")]
        public string CategoryUrl { get; set; }


        public virtual ICollection<CategoryTransaction> CategoryTransactions { get; set; }

    }
}
