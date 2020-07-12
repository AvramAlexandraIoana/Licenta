using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebFMI.Models;

namespace WebFMI.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);

        Task<User> Login(string userName, string password);

        Task<User> LoginGoogle(User user);

        Task<bool> UserExists(string userName);
    }
}
