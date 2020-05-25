using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebFMI.Data;
using WebFMI.Models;

namespace WebFMI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryTransactionController : Controller
    {
        private readonly ApplicationDbContext _context;
        public CategoryTransactionController(ApplicationDbContext context)
        {
            this._context = context;
        }

        [HttpGet("index")]
        public async Task<IActionResult> AllCategoryTransactions()
        {
            var transactions = await _context.CategoryTransactions.ToListAsync();
            return Ok(transactions);

        }

        [HttpGet("index/{id}")]
        public async Task<IActionResult> CategoryTransactions(int id)
        {
            var categoryTransactions = await _context.CategoryTransactions.Where(u => u.UserId == id).ToListAsync();
            return Ok(categoryTransactions);
        }

        [HttpGet("show/{id}")]
        public async Task<IActionResult> ShowCategoryTransaction(int id)
        {
            CategoryTransaction transaction = await _context.CategoryTransactions.FindAsync(id);
            if (transaction ==  null)
            {
                return BadRequest("Nu exista  tranzactia!");
            }
            return Ok(transaction);
        }

        [HttpPost("new")]
        public async Task<IActionResult>  AddCategoryTransaction(CategoryTransaction transaction)
        {

            try
            {
                var transact =  await _context.CategoryTransactions.AddAsync(transaction);
                await _context.SaveChangesAsync();
            } catch(Exception e)
            {
                return BadRequest("Nu se permite");
            }
            return StatusCode(201);
        }

        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditCategoryTransaction(int id, CategoryTransaction requestTransaction)
        {
            CategoryTransaction transaction = await _context.CategoryTransactions.FindAsync(id);
            if (transaction == null)
            {
                return BadRequest("Nu exista Tranzactia!");
            }
            transaction.Description = requestTransaction.Description;
            transaction.Value = requestTransaction.Value;
            transaction.TransactionDate = requestTransaction.TransactionDate;
            transaction.CategoryId = requestTransaction.CategoryId;

            await _context.SaveChangesAsync();
            return Ok(transaction);


        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCategoryTransaction(int id)
        {
            CategoryTransaction transaction = await _context.CategoryTransactions.FindAsync(id);

            if (transaction == null)
            {
                return BadRequest("Nu exista tranzactia");
            }

            _context.CategoryTransactions.Remove(transaction);
            await  _context.SaveChangesAsync();

            return Ok(201);
        }

    }
}