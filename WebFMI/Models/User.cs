using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace WebFMI.Models
{
    public class User : IdentityUser<int>
    {
 
      
        public string Name { get; set; }

        public string City { get; set; }

        public string Country { get; set; }



        public string Gender { get; set; }

        public string Language { get; set; }

        public DateTime DateOfBirth { get; set; }

        public DateTime Created { get; set; }

       //public byte[] PasswordHash { get; set; }


        public byte[] PasswordSalt { get; set; }
       
        public string Description { get; set; }

        public float SumaR { get; set; }

        public float SumaRSpend { get; set; }
        public float SumaE { get; set; }

        public float SumaESpend { get; set; }


        public float SumaD { get; set; }
        public float SumaDSpend { get; set; }


        public bool AreSumaR { get; set; }
        public bool AreSumaE { get; set; }

        public bool AreSumaD { get; set; }



        public string DefaultCard { get; set; }



        public string PasswordForgot { get; set; }

        public string ProfilePicturePath { get; set; }

        public string ProfilePictureName { get; set; }



        public ICollection<UserRole> UserRoles { get; set; }

        public ICollection<Photo> Photos { get; set; }

        public string PostalCode { get; set; }

        public string Adress { get; set; }

        public string Adress1 { get; set; }

        public string Judet { get; set; }

        public int UserId1 { get; set; }
        public string Mess { get; set; }

        public DateTime SendMess { get; set; }

        public virtual ICollection<RecentSearch> RecentSearches { get; set; }





        //public ICollection<Transaction> Transactions { get; set; }



        /*public byte[] ConfirmPassword { get; set; }*/
    }
}
