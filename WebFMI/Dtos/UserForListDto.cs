using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebFMI.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string City { get; set; }

        public string Country { get; set; }


        public string Gender { get; set; }

        public DateTime DateOfBirth { get; set; }

        public DateTime Created { get; set; }

        public string PhotoUrl { get; set; }

    }
}
