using System;
using System.Collections.Generic;
using System.Globalization;
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
    public class TransactionController : Controller
    {
        private readonly ApplicationDbContext _context;
        public TransactionController(ApplicationDbContext context)
        {
            this._context = context;
        }

        [HttpGet("index")]
        public async Task<IActionResult> AllTransactions()
        {
            var transactions = await _context.Transactions.ToListAsync();
            return Ok(transactions);

        }

        [HttpGet("allNotification/{id}")]
        public async Task<IActionResult> AllNotifications(int id)
        {
            var transactions = await _context.Transactions.Where(u => u.UserId == id || u.UserId1 == id).ToListAsync();
            return Ok(transactions);
        }

        [HttpGet("show/{id}")]
        public async Task<IActionResult> ShowTransaction(int id)
        {
            Transaction transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return BadRequest("Nu exista  tranzactia!");
            }
            return Ok(transaction);
        }

        [HttpPost("new")]
        public async Task<IActionResult> AddTransaction(Transaction transaction)
        {
            transaction.Date = DateTime.Now;

            try
            {
                var transact = await _context.Transactions.AddAsync(transaction);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest("Nu se permite");
            }
            return StatusCode(201);
        }

        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditTransaction(int id, Transaction requestTransaction)
        {
            Transaction transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return BadRequest("Nu exista Tranzactia!");
            }
            transaction.Description = requestTransaction.Description;
            transaction.Value = requestTransaction.Value;

            await _context.SaveChangesAsync();
            return Ok(transaction);


        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            Transaction transaction = await _context.Transactions.FindAsync(id);

            if (transaction == null)
            {
                return BadRequest("Nu exista tranzactia");
            }

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return Ok(201);
        }

        [HttpGet("getTransactionsForToday/{id}")]
        public async Task<IActionResult> GetTransactionCurrentDay(int id)
        {
            var transactionList = await _context.Transactions.Where(u => u.UserId == id).Where(d => (d.Date.Day == DateTime.Now.Day && d.Date.Month ==  DateTime.Now.Month && d.Date.Year == DateTime.Now.Year) )
                                        .Select(transaction => new
                                        {
                                            Transactions = transaction

                                        }).ToListAsync();
            return Ok(transactionList);
        }

        [HttpGet("getTransactionsForWeek/{id}")]
        public async Task<IActionResult> GetTransactionCurrentWeek(int id)
        {

            CultureInfo ciCurr = CultureInfo.CurrentCulture;
            int weekNum = ciCurr.Calendar.GetWeekOfYear(DateTime.Now, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
            var transactionList = await _context.Transactions.Where(u => u.UserId == id).Where(d => (d.Date.Month == DateTime.Now.Month))
                                        .Select(transaction => new
                                        {
                                            Transactions = transaction

                                        }).ToListAsync();
            return Ok(transactionList);
        }

        [HttpGet("getTransactionsForMonth/{id}")]
        public async Task<IActionResult> GetTransactionCurrentMonth(int id)
        {
            var transactionList = await _context.Transactions.Where(u => u.UserId == id).Where(d => (d.Date.Month == DateTime.Now.Month && d.Date.Year == DateTime.Now.Year))
                                        .Select(transaction => new
                                        {
                                            Transactions = transaction

                                        }).ToListAsync();
            return Ok(transactionList);
        }

        [HttpGet("getTransactionsForYear/{id}")]
        public async Task<IActionResult> GetTransactionCurrentYear(int id)
        {
            var transactionList = await _context.Transactions.Where(u => u.UserId == id).Where(d => (d.Date.Month == DateTime.Now.Month && d.Date.Year == DateTime.Now.Year))
                                        .Select(transaction => new
                                        {
                                            Transactions = transaction

                                        }).ToListAsync();
            return Ok(transactionList);
        }

    }
}