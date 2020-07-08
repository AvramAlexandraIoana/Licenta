using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebFMI.Data;
using WebFMI.Dtos;
using WebFMI.Models;

namespace WebFMI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public AdminController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        //[Authorize(Policy = "RequireAdminRole")]
        [HttpGet("usersWithRoles")]

        public async Task<IActionResult> GetUsersWithRoles()
        {
            var userList = await _context.Users
                .OrderBy(x => x.UserName)
                .Select(user => new
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    City = user.City,
                    PhoneNumber = user.PhoneNumber,
                    Roles = (from userRole in _context.UserRoles
                                 join role in _context.Roles
                                 on userRole.RoleId 
                                 equals role.Id
                             where userRole.UserId  ==  user.Id
                                 select role.Name).ToList()
                }).ToListAsync();

            /*var userList = await _context.Roles
               .OrderBy(x => x.Id)
               .Select(user => new
               {
                   Id = user.Id,
                   UserName = user.Name


               }).ToListAsync();
               _context.UserRoles.Select(r => r.RoleId).ToList()

            */

            return Ok(userList);
        }



        [HttpGet("getRoles/{id}")]
        public async Task<IActionResult> GetRoles(int id)
        {
            var roleNames = await _context.UserRoles.Where(u => u.UserId == id)
            .Select(userRole => new
            {
                User = (from role in _context.Roles
                        where role.Id == userRole.RoleId
                        select role.Name).ToList()
            }).ToListAsync();

            var roles = new ArrayList();
            foreach (var r in roleNames)
            {
                roles.Add(r.User[0]);
            }
            return Ok(roles);

        }
        //[Authorize(Policy = "RequireAdminRole")]
        [HttpPost("editRoles/{userName}")]
        public async Task<IActionResult> EditRoles(string userName, RoleEditDto roleEditDto)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return NotFound();
            }

            await _userManager.UpdateSecurityStampAsync(user);
            await _userManager.UpdateNormalizedEmailAsync(user);
            await _userManager.UpdateNormalizedUserNameAsync(user);
            await _userManager.SetLockoutEnabledAsync(user, true);

            if (ModelState.IsValid)
            {
                try
                {
                    var listOfRoles = await _userManager.GetRolesAsync(user);
                    var selectedRoles = roleEditDto.RoleNames;


                    foreach (var role in listOfRoles.Except(selectedRoles))
                    {
                        await _userManager.RemoveFromRoleAsync(user, role);
                    }

                    foreach (var role in selectedRoles.Except(listOfRoles))
                    {
                        await _userManager.AddToRoleAsync(user, role);
                    }

                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    var user1 = await _userManager.FindByEmailAsync(userName);
                    if (user1 == null)
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            return Ok(await _userManager.GetRolesAsync(user));

        }
        // GET: api/Admin
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Admin/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Admin
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Admin/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
