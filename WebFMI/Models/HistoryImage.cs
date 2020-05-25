using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebFMI.Models
{
    public class HistoryImage
    {

        public int HistoryImageId { get; set; }

        public string HistoryImageUrl { get; set; }

        public DateTime CreatedOn { get; set; }

        public int UserId { get; set; }

        public virtual User User { get; set; }
    }
}
