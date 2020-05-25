using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebFMI.Models;

namespace WebFMI.Dtos
{
    public class UserForDetailedDto
    {
        public string Name { get; set; }

        public string City { get; set; }

        public string Country { get; set; }


        public string Gender { get; set; }

        public DateTime DateOfBirth { get; set; }

        public DateTime Created { get; set; }

        public string PhotoUrl { get; set; }
        public ICollection<PhotosForDetailedDto> Photos { get; set; }
    }
}
