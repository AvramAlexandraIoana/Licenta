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
    public class LimitationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public LimitationController(ApplicationDbContext context)
        {
            this._context = context;
        }


        [HttpGet("index")]
        public async Task<ActionResult<IEnumerable<Limitation>>> GetLimitations()
        {

            return await _context.Limitations.ToListAsync();
        }

        [HttpGet("show/{id}")]
        public async Task<IActionResult> ShowLimitation(int id)
        {
            Limitation limitation = await _context.Limitations.FindAsync(id);
            return Ok(limitation);

        }


        [HttpPost("new")]
        public async Task<IActionResult> Create(Limitation limitation)
        {
            try
            {
                var limitElement = await _context.Limitations.Where(u => (u.UserId == limitation.UserId && u.CategoryId == limitation.CategoryId && u.Unit == limitation.Unit)).ToListAsync();
                if (limitElement.Count() > 0)
                {
                    for (var i = 0; i < limitElement.Count(); i++)
                    {
                        var currentElem = await _context.Limitations.FindAsync(limitElement[i].Id);
                        _context.Limitations.Remove(currentElem);

                    }
                }
                var li = await _context.Limitations.AddAsync(limitation);
                await _context.SaveChangesAsync();
                return Ok(201);
            }
            catch (Exception e)
            {
                return BadRequest("Eroare de la baza de date");
            }

        }




        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteLimitation(int id)
        {
            var limitation = await _context.Limitations.FindAsync(id);
            if (limitation == null)
            {
                return BadRequest("Nu exista categoria!");
            }
            _context.Limitations.Remove(limitation);
            await _context.SaveChangesAsync();
            return StatusCode(201);
        }
        }
    }
