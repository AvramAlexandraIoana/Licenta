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
    public class RecentSearchController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public RecentSearchController(ApplicationDbContext context)
        {
            this._context = context;
        }


        [HttpGet("index")]
        public async Task<ActionResult<IEnumerable<RecentSearch>>> GetRecentSearchList()
        {

            return await _context.RecentSearches.ToListAsync();
        }

       


        [HttpPost("new")]
        public async Task<IActionResult> Create(RecentSearch recentSearch)
        {
            try
            {
                var cont = await _context.RecentSearches.AddAsync(recentSearch);
                await _context.SaveChangesAsync();
                return Ok(201);
            }
            catch (Exception e)
            {
                return BadRequest("Eroare de la baza de date");
            }

        }




        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteRecentSearch(int id)
        {
            var recentSearch = await _context.RecentSearches.FindAsync(id);
            if (recentSearch == null)
            {
                return BadRequest("Nu exista categoria!");
            }
            _context.RecentSearches.Remove(recentSearch);
            await _context.SaveChangesAsync();
            return StatusCode(201);
        }
    }
}
