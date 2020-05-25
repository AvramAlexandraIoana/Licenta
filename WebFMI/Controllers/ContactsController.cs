using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebFMI.Data;
using WebFMI.Models;

namespace WebFMI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ContactsController(ApplicationDbContext context)
        {
            this._context = context;
        }


        [HttpGet("index")]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContactList()
        {

            return await _context.Contacts.ToListAsync();
        }

        [HttpGet("show/{id}")]
        public async Task<IActionResult> ShowContact(int id)
        {
            Contact contact = await _context.Contacts.FindAsync(id);
            return Ok(contact);

        }


        [HttpPost("new")]
        public async Task<IActionResult> Create(Contact contact)
        {
            try
            {
                contact.CreatedOn = DateTime.Now;
                var cont = await _context.Contacts.AddAsync(contact);
                await _context.SaveChangesAsync();
                return Ok(201);
            }
            catch (Exception e)
            {
                return BadRequest("Eroare de la baza de date");
            }

        }




        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return BadRequest("Nu exista categoria!");
            }
            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
            return StatusCode(201);
        }
    }
}
