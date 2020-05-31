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
    public class LimitationCategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public LimitationCategoryController(ApplicationDbContext context)
        {
            this._context = context;
        }


        [HttpGet("index")]
        public async Task<ActionResult<IEnumerable<LimitationCategory>>> GetLimitationIndex()
        {

            return await _context.LimitationCategories.ToListAsync();
        }

        [HttpGet("show/{id}")]
        public async Task<IActionResult> ShowLimitation(int id)
        {
            LimitationCategory limit = await _context.LimitationCategories.FindAsync(id);
            return Ok(limit);

        }


        [HttpPost("new")]
        public async Task<IActionResult> Create(LimitationCategory limit)
        {
            try
            {
                var limitation = await _context.LimitationCategories.AddAsync(limit);
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
            var limitation = await _context.LimitationCategories.FindAsync(id);
            if (limitation == null)
            {
                return BadRequest("Nu exista categoria!");
            }
            _context.LimitationCategories.Remove(limitation);
            await _context.SaveChangesAsync();
            return StatusCode(201);
        }
    }
}
