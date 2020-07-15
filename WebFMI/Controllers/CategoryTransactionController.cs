using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.CodeAnalysis.CSharp.Syntax;
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
                var leaveQuota = await _context.CategoryTransactions
                            .Where(Q => Q.UserId == transaction.UserId && Q.CategoryId == transaction.CategoryId && Q.Unit == transaction.Unit)
                            .GroupBy(x => x.CategoryId).Select(x =>
                            new MoneySpend
                            {
                                Sum = x.Sum(y => y.Value),
                                Id = x.Key,
                                Size = x.Count()
                            }).ToListAsync();
                if (leaveQuota.Count() > 0)
                {
                    var sum = leaveQuota[0].Sum;
                    var id = leaveQuota[0].Id;
                    var findLimitation = await _context.Limitations.Where(u => u.CategoryId == id && u.Unit == transaction.Unit && u.UserId == transaction.UserId).ToListAsync();
                    if (findLimitation.Count() > 0)
                    {
                        if (sum + transaction.Value > findLimitation[0].Value)
                        {
                            return BadRequest("LIMITARE");
                        }
                    }
           
                } else
                {
                    var findLimitation = await _context.Limitations.Where(u => u.CategoryId == transaction.CategoryId  && u.Unit == transaction.Unit && u.UserId == transaction.UserId).ToListAsync();
                    if (findLimitation.Count() > 0)
                    {
                        if (transaction.Value > findLimitation[0].Value)
                        {
                            return BadRequest("LIMITARE");
                        }
                    }
                }

                var user = await _context.Users.FindAsync(transaction.UserId);
                if (transaction.Unit == "$")
                {
                    if (user.SumaD - user.SumaDSpend - transaction.Value >=0)
                    {
                        user.SumaDSpend += transaction.Value;
                    } else
                    {
                        return Ok(false);
                    }
                } else if (transaction.Unit == "€")
                {
                    if (user.SumaE - user.SumaESpend - transaction.Value >= 0)
                    {
                        user.SumaESpend += transaction.Value;
                    }
                    else
                    {
                        return Ok(false);
                    }
                } else if (transaction.Unit == "r")
                {
                    if (user.SumaR - user.SumaRSpend - transaction.Value >= 0)
                    {
                        user.SumaRSpend += transaction.Value;
                    }
                    else
                    {
                        return Ok(false);
                    }
                }
                var category = await _context.Categories.FindAsync(transaction.CategoryId);
                transaction.ImageUrl = category.CategoryUrl;
                transaction.TransactionDate = DateTime.Now;
                var transact =  await _context.CategoryTransactions.AddAsync(transaction);
                await _context.SaveChangesAsync();
            } catch(Exception e)
            {
                return BadRequest("Nu se permite");
            }
            return Ok(true);
        }

        [HttpGet("getExpenses/{id}/{unit}/{month}")]
        public async Task<IActionResult> GetExpenses(int id, string unit, int month)
        {
            var user = await _context.Users.FindAsync(id);
            var leaveQuota = await _context.CategoryTransactions
                             .Where(Q => Q.UserId == id && Q.TransactionDate.Month == month + 1)
                             .GroupBy(x => x.CategoryId).Select(x =>
                             new MoneySpend
                             {
                                 Sum = x.Sum(y => y.Value),
                                 Id = x.Key,
                                 Size = x.Count()
                             }).ToListAsync();
            var transactionCount = await _context.Transactions
                                    .Where(u => (u.UserId == id  && !u.Rejected  && u.IsSend && u.Date.Month == month + 1))
                                    .GroupBy(x => x.UserId).Select(x =>
                                     new MoneySpend
                                     {
                                         Sum = x.Sum(y => y.Value),
                                         Id = x.Key,
                                         Size = x.Count()
                                     }).ToListAsync();
            var transactionCount1 = await _context.Transactions
                                 .Where(u => (u.UserId1 == id && u.Accepted && !u.IsSend && u.Date.Month == month + 1))
                                 .GroupBy(x => x.UserId).Select(x =>
                                  new MoneySpend
                                  {
                                      Sum = x.Sum(y => y.Value),
                                      Id = x.Key,
                                      Size = x.Count()
                                  }).ToListAsync();
            if (transactionCount.Count() > 0)
            {
                if (transactionCount1.Count() > 0)
                {
                    leaveQuota.Add(new MoneySpend
                    {
                        Sum = transactionCount.First().Sum + transactionCount1.First().Sum,
                        Size = transactionCount.First().Size + transactionCount1.First().Size
                    }); 
                } else
                {
                    leaveQuota.Add(new MoneySpend
                    {
                        Sum = transactionCount.First().Sum ,
                        Size = transactionCount.First().Size
                    });
                }

            } if (transactionCount1.Count() > 0)
            {
                leaveQuota.Add(new MoneySpend
                {
                    Sum = transactionCount1.First().Sum,
                    Size = transactionCount1.First().Size
                });
            }

             return Ok(leaveQuota);

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

        [HttpGet("getCategoryNotificationsForToday/{id}")]
        public async Task<IActionResult> GetNotificationsForToday(int id)
        {
            var categoryTransactionsList = await _context.CategoryTransactions.Where(u => u.UserId == id).Where(d => (d.TransactionDate.Day == DateTime.Now.Day && d.TransactionDate.Month == DateTime.Now.Month && d.TransactionDate.Year == DateTime.Now.Year))
                                        .Select(transaction => new
                                        {
                                            Transactions = transaction,
                                            User = (from user in _context.Users
                                                    where transaction.UserId == user.Id
                                                    select user).ToList()

                                        }).ToListAsync();
            return Ok(categoryTransactionsList);
        }

        [HttpGet("getCategoryNotificationsForYestarday/{id}")]
        public async Task<IActionResult> GetCategoryNotificationsForYestarday(int id)
        {
            var categoryTransactionsList = await _context.CategoryTransactions.Where(u => u.UserId == id).Where(d => (d.TransactionDate.Day == DateTime.Now.Day - 1 && d.TransactionDate.Month == DateTime.Now.Month && d.TransactionDate.Year == DateTime.Now.Year))
                                         .Select(transaction => new
                                         {
                                             Transactions = transaction,
                                             User = (from user in _context.Users
                                                     where transaction.UserId == user.Id
                                                     select user).ToList()

                                         }).ToListAsync();
            return Ok(categoryTransactionsList);
        }

        [HttpGet("getCategoryNotificationsForThisWeek/{id}")]
        public async Task<IActionResult> GetCategoryNotificationsForThisWeek(int id)
        {
            var categoryTransactionsList = await _context.CategoryTransactions.Where(u => u.UserId == id).Where(d => (d.TransactionDate.Day == DateTime.Now.Day && d.TransactionDate.Month == DateTime.Now.Month && d.TransactionDate.Year == DateTime.Now.Year))
                                        .Select(transaction => new
                                        {
                                            Transactions = transaction,
                                            User = (from user in _context.Users
                                                    where transaction.UserId == user.Id
                                                    select user).ToList()

                                        }).ToListAsync();
            return Ok(categoryTransactionsList);
        }

        [HttpGet("getCategoryTransactionsForToday/{id}/{unit}")]
        public async Task<IActionResult> GetTransactionCurrentDay(int id, string unit)
        {
            var categoryTransactionsList = await _context.CategoryTransactions.OrderByDescending(u => u.TransactionDate).Where(u => u.UserId == id).Where(d => (d.TransactionDate.Day == DateTime.Now.Day && d.TransactionDate.Month == DateTime.Now.Month && d.TransactionDate.Year == DateTime.Now.Year && d.Unit == unit))
                                        .ToListAsync();
            return Ok(categoryTransactionsList);
        }



        [HttpGet("getCategoryTransactionsForWeek/{id}/{unit}")]
        public async Task<IActionResult> GetTransactionCurrentWeek(int id, string unit)
        {

            var categoryTransactionsList = await _context.CategoryTransactions.OrderByDescending(u => u.TransactionDate).Where(u => u.UserId == id).Where(d => (d.TransactionDate.Month == DateTime.Now.Month && d.TransactionDate.Year == DateTime.Now.Year && d.Unit == unit))
                                       .ToListAsync();
            return Ok(categoryTransactionsList);
        }

        [HttpGet("getCategoryTransactionsForMonth/{id}/{unit}")]
        public async Task<IActionResult> GetTransactionCurrentMonth(int id, string unit)
        {
            var categoryTransactionsList = await _context.CategoryTransactions.OrderByDescending(u => u.TransactionDate).Where(u => u.UserId == id).Where(d => (d.TransactionDate.Month == DateTime.Now.Month && d.TransactionDate.Year == DateTime.Now.Year && d.Unit == unit))
                                        .ToListAsync();
            return Ok(categoryTransactionsList);
        }

        [HttpGet("getCategoryTransactionsForYear/{id}/{unit}")]
        public async Task<IActionResult> GetTransactionCurrentYear(int id, string unit)
        {
            var categoryTransactionsList = await _context.CategoryTransactions.OrderByDescending(u => u.TransactionDate).Where(u => u.UserId == id).Where(d => (d.TransactionDate.Year == DateTime.Now.Year && d.Unit == unit))
                                            .ToListAsync();
            return Ok(categoryTransactionsList);
        }

    }
}