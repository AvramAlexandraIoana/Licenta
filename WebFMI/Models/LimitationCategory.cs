using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebFMI.Models
{
    public class LimitationCategory
    {
        [Key]
        public int LimitationCategoryId { get; set; }

        public string Unit { get; set; }

        public float Limit { get; set; }

        public string CategoryId { get; set; }

        public virtual Category Category { get; set; }

        public string CategoryName { get; set; }

        public int UserId { get; set; }




    }
}
