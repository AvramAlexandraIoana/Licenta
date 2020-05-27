using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebFMI.Models
{
    public class Review
    {
        [Key]
        public int ReviewId { get; set; }

        public string Emotion { get; set; }

        public string FeedbackR { get; set; }

        public string FeedbackE { get; set; }

        public DateTime CreatedOn { get; set; }

        public string Type { get; set; }

        public float Score { get; set; }

        public virtual User User { get; set; }

        public int UserId { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }



    }
}
