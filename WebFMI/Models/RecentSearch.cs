using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebFMI.Models
{
    public class RecentSearch
    {
        [Key]
        public int RecentId { get; set; }

        public int UserId { get; set; }

        public int UserId1 { get; set; }

        public virtual User User { get; set; }
    }
}
