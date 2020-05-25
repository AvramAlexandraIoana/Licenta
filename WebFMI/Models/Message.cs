using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebFMI.Models
{
    public class Message
    {

        [Key]
        public int Id { get; set; }

        public string Messagge { get; set; }

        public DateTime CreatedAt { get; set; }

        public int UserId1 { get; set; }


        public virtual User User { get; set; }

        public int UserId2 { get; set; }


    }
}
