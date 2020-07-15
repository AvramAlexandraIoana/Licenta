using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebFMI.Models
{
    public class Limitation
    {
        [Key]
        public int Id { get; set; }

        public string Unit { get; set; }
        public int Value { get; set; }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public int UserId { get; set; }


        public virtual User User { get; set; }
    }
}
