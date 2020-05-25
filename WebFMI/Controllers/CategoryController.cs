using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebFMI.Data;
using WebFMI.Dtos;
using WebFMI.Models;

namespace WebFMI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {
        private readonly ApplicationDbContext _context;
        public CategoryController(ApplicationDbContext context)
        {
            this._context = context;
        }

      
        [HttpGet("index")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
           
            return await _context.Categories.ToListAsync();
        }

        [HttpGet("show/{id}")]
        public async Task<IActionResult> ShowCategory(int id)
        {
            Category category = await _context.Categories.FindAsync(id);
            return Ok(category);

        }


        [HttpPost("new")]
        public async Task<IActionResult> Create(Category category)
        {
            try
            {
                var cat = await _context.Categories.AddAsync(category);
                await _context.SaveChangesAsync();
                return Ok(201);
            } catch (Exception e)
            {
                return BadRequest("Eroare de la baza de date");
            }
          
        }

        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditCategory(int id, Category category)
        {
            var cat = await _context.Categories.FindAsync(id);

            if (cat == null)
            {
                return BadRequest("Nu exista categoria!");
            }

            cat.CategoryName = category.CategoryName;
            await _context.SaveChangesAsync();

            return Ok(cat);

        }


        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCategoy(int id)
        {
            var cat = await _context.Categories.FindAsync(id);
            if (cat == null)
            {
                return BadRequest("Nu exista categoria!");
            }
            _context.Categories.Remove(cat);
            await _context.SaveChangesAsync();
            return StatusCode(201);
        }

    }
}