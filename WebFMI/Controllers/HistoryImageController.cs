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
    public class HistoryImageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public HistoryImageController(ApplicationDbContext context)
        {
            this._context = context;
        }


        [HttpGet("index")]
        public async Task<ActionResult<IEnumerable<HistoryImage>>> GetHistoryImages()
        {

            return await _context.HistoryImages.ToListAsync();
        }

        [HttpGet("show/{id}")]
        public async Task<IActionResult> ShowImages(int id)
        {
            HistoryImage historyImage = await _context.HistoryImages.FindAsync(id);
            return Ok(historyImage);

        }


        [HttpPost("new")]
        public async Task<IActionResult> Create(HistoryImage historyImage)
        {
            try
            {
                historyImage.CreatedOn = DateTime.Now;
                var history = await _context.HistoryImages.AddAsync(historyImage);
                await _context.SaveChangesAsync();
                return Ok(201);
            }
            catch (Exception e)
            {
                return BadRequest("Eroare de la baza de date");
            }

        }

 


        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteHistoryImage(int id)
        {
            var historyImg = await _context.HistoryImages.FindAsync(id);
            if (historyImg == null)
            {
                return BadRequest("Nu exista categoria!");
            }
            _context.HistoryImages.Remove(historyImg);
            await _context.SaveChangesAsync();
            return StatusCode(201);
        }
    }
}
