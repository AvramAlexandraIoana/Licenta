using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WebFMI.Dtos
{
    public class UserForLoginDto
    {
        [Required]
        //[MinLength(8, ErrorMessage = "You must specify a account number with minimum 8 characters")]

        public string UserName { get; set; }

        [Required]
        //[MinLength(4, ErrorMessage = "Your card pin must had minimum 4 characters")]
        public string Password { get; set; }

        public string provider { get; set; }
        public string provideid { get; set; }
        public string image { get; set; }
        public string token { get; set; }
        public string idToken { get; set; }

        /*
        [Required]
        [MinLength(8, ErrorMessage = "You must specify a username highest then 8 characters")]
        public string UserName { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 8 characters")]
        public string Password { get; set; }*/
    }
}
