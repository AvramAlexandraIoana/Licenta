using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WebFMI.Dtos
{
    public class UserForRegisterDto
    {

        [Required]
        //[StringLength(8, ErrorMessage = "You must specify a account number with 10 characters")]
        public string Username { get; set; }

        [Required]
       // [StringLength(4, ErrorMessage = "Your card pin must had 4 characters")]
        public string Email { get; set; }

        [Required]
       // [StringLength(4, ErrorMessage = "Your card pin must had 4 characters")]
        public string Password { get; set; }
        /*
        [Required]
        public string Name { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "You must specify a username highest then 8 characters")]
        public string UserName { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 8 characters")]
        public string Password { get; set; }*/

        /*public string ConfirmPassword { get; set; }*/

    }
}
