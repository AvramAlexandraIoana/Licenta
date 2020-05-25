using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebFMI.Dtos
{
    public class CategoryDto
    {
        [Required]
        public string CategoryName { get; set; }
    }
}
