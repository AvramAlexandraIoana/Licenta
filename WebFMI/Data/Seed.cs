using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebFMI.Models;

namespace WebFMI.Data
{
    public class Seed
    {
        private readonly ApplicationDbContext _context;
        private readonly IAuthRepository _repo;

        public Seed(ApplicationDbContext context, IAuthRepository repo)
        {
            _context = context;
            _repo = repo;
        }

        public static  void SeedUsers(ApplicationDbContext _context, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            var users =  _context.Users.ToList();
            var elem = userManager.Users.Any();
            /*if (_context.Users.Any())*/
                /*var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                */
                //create roles
           string[] roleNames = { "Admin", "Store-Manager", "Member" };


           foreach (var roleName in roleNames)
           {
                var roleExist =   roleManager.RoleExistsAsync(roleName).Result;
                // ensure that the role does not exist
                if (!roleExist)
                {
                  //create the roles and seed them to the database: 
                  roleManager.CreateAsync(new Role { Name = roleName}).Wait();
                }
           }

            foreach (var user in users)
            {
                //userManager.CreateAsync(user, "password").Wait();
                if (user.UserName != "admin@gmail.com")
                {
                    userManager.AddToRoleAsync(user, "Member").Wait();


                }
            }

           // find the user with the admin email 
           var _user =  userManager.FindByEmailAsync("admin@gmail.com").Result;

            // check if the user exists
            if (_user == null)
            {
                //Here you could create the super admin who will maintain the web app
                var poweruser = new User
                {
                    Name = "admin@gmail.com",
                    UserName = "admin@gmail.com",
                    Email = "admin@gmail.com",
                    EmailConfirmed = true,
                    NormalizedEmail = "admin@gmail.com",
                    City = "Barcelona",
                    Description = "Test"
                };
                string adminPassword = "Administrator1";

                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(adminPassword, out passwordHash, out passwordSalt);

                poweruser.PasswordSalt = passwordSalt;
               // poweruser.PasswordHash = passwordHash;

                var createPowerUser = userManager.CreateAsync(poweruser, adminPassword).Result;


                if (createPowerUser.Succeeded)
                {
                    //here we tie the new user to the role
                    /*var admin = userManager.FindByEmailAsync("Admin").Result;*/
                    userManager.AddToRoleAsync(poweruser, "Admin").Wait();
                    //await _userManager.AddToRoleAsync(user, role);
                }
            }
            
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
