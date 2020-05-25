using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using WebFMI.Data;
using WebFMI.Models;

namespace WebFMI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public MessagesController(ApplicationDbContext context)
        {
            this._context = context;
        }


        [HttpGet("index/{id1}/{id2}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessageList(int id1, int id2)
        {

            return await _context.Messages.Where(x => ((x.UserId1 == id1 && x.UserId2 == id2) || (x.UserId1 == id2 && x.UserId2 == id1))).ToListAsync();
        }




        [HttpPost("new")]
        public async Task<IActionResult> Create(Message message)
        {
            try
            {
                var mes = await _context.Messages.AddAsync(message);
                await _context.SaveChangesAsync();
                return Ok(201);
            }
            catch (Exception e)
            {
                return BadRequest("Eroare de la baza de date");
            }

        }


        [HttpGet("getUsersIds/{id}")]
        public async Task<IActionResult> GetUsersIds(int id)
        {

            var userList = await _context.Messages.Where(u => (u.UserId2 == id || u.UserId1 == id))
                .Select(mess => new
                {
                    User = (from user in _context.Users
                            where user.Id == mess.UserId2 || user.Id == mess.UserId1
                            select user).ToList(),
                   


                }).Distinct().ToListAsync();
            foreach (User  user in userList[0].User)
            {
                if (user.Id != id)
                {
                    Message message =  GetLatestMessage(user.Id, id).Result;
                    user.UserId1 = message.UserId1;
                    user.Mess = message.Messagge;
                    user.SendMess = message.CreatedAt;

                }


            }

            return Ok(userList);

        }

        public async Task<Message> GetLatestMessage(int id1, int id2)
        {
            var message = await _context.Messages
                          .Where(u => ((u.UserId1 == id1 && u.UserId2 == id2) ||( u.UserId1 == id2 && u.UserId2 == id1)))
                          .Select(m => m)
                          .Distinct()
                          .ToListAsync();
            var ms = message.OrderByDescending(u => u.CreatedAt);
            return ms.First();
        }

        [HttpGet("getRecentSearchesList/{id}")]
        public async Task<IActionResult> UpdateSuggestedList(int id)
        {

            var userList = await _context.RecentSearches.Where(u => u.UserId == id)
                .Select(rs => new
                {
                    User = (from user in _context.Users
                            where user.Id == rs.UserId1
                            select user).ToList(),



                }).Distinct().ToListAsync();
            return Ok(userList[0].User);
        }



    }
}
