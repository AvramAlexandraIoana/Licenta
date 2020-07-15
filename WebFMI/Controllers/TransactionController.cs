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
using System.Globalization;
using Org.BouncyCastle.Ocsp;
using sinkien.IBAN4Net;

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

        [HttpGet("index/{id}")]
        public async Task<IActionResult> Transactions(int id)
        {

            var transactionList = await _context.Transactions.OrderByDescending(u => u.Date).Where(u => u.UserId1 == id).Where(d => (d.Date.Month == DateTime.Now.Month && d.Date.Year == DateTime.Now.Year))
                                    .ToListAsync();
            return Ok(transactionList);
        }

        [HttpGet("getNumberOfNotification/{id}")]
        public async Task<IActionResult> GetNumberOfNotification(int id)
        {
            var transactionList = await _context.Transactions.Where(u => u.UserId1 == id && !u.Accepted).Where(d => (d.Date.Month == DateTime.Now.Month && d.Date.Year == DateTime.Now.Year))
                                   .ToListAsync();
            return Ok(transactionList);
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
        [HttpPost("new/iban")]
        public async Task<IActionResult> AddIbanTransaction(IbanTransaction transaction)
        {
            transaction.Date = DateTime.Now;
            var account = await _context.Accounts.Where(u => (u.CardHolderName == transaction.Name && u.Iban == transaction.Iban)).ToListAsync();
            if (account.Count == 0)
            {
                return BadRequest("Nu exista iban-ul sau numele introdus");
            }
            transaction.UserId1 = account[0].UserId;
            User user = await _context.Users.FindAsync(transaction.UserId);
            try
            {
                if (transaction.IsSend)
                {
                  ;
                    if (transaction.Unit == "$" && transaction.IsSend && user.AreSumaD)
                    {
                        if (user.SumaD - user.SumaDSpend - transaction.Value >= 0)
                        {
                            user.SumaDSpend += transaction.Value;
                        }
                        else
                        {
                            return Ok(false);
                        }
                    }
                    else if (transaction.Unit == "€" && transaction.IsSend && user.AreSumaE)
                    {
                        if (user.SumaE - user.SumaESpend - transaction.Value >= 0)
                        {
                            user.SumaESpend += transaction.Value;
                        }
                        else
                        {
                            return Ok(false);
                        }
                    }
                    else if (transaction.Unit == "r" && transaction.IsSend && user.AreSumaR)
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
                }
                Transaction tr = new Transaction();
                tr.UserId = transaction.UserId;
                tr.UserId1 = transaction.UserId1;
                tr.IsSend = transaction.IsSend;
                tr.Value = transaction.Value;
                tr.Unit = transaction.Unit;
                tr.Description = transaction.Description;
                tr.Date = transaction.Date;
                tr.ImageUrl = user.ProfilePictureName;
                tr.UserName = user.UserName;
                var transact = await _context.Transactions.AddAsync(tr);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest("Nu se permite");
            }
            return Ok(true);
        }

        [HttpPost("new")]
        public async Task<IActionResult> AddTransaction(Transaction transaction)
        {
            transaction.Date = DateTime.Now;
            
           

            try
            {
                if (transaction.IsSend)
                {
                    var user = await _context.Users.FindAsync(transaction.UserId);
                    if (transaction.Unit == "$" && transaction.IsSend && user.AreSumaD)
                    {
                        if (user.SumaD - user.SumaDSpend - transaction.Value >= 0)
                        {
                            user.SumaDSpend += transaction.Value;
                        } else
                        {
                            return Ok(false);
                        }
                    }
                    else if (transaction.Unit == "€" && transaction.IsSend && user.AreSumaE)
                    {
                        if (user.SumaE -  user.SumaESpend - transaction.Value >= 0)
                        {
                            user.SumaESpend += transaction.Value;
                        }
                        else
                        {
                            return Ok(false);
                        }
                    } else if (transaction.Unit == "r" && transaction.IsSend && user.AreSumaR)
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
                }
                var transact = await _context.Transactions.AddAsync(transaction);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest("Nu se permite");
            }
            return Ok(true);
        }

        [HttpGet("getSpendMoney/{id}")]
        public async Task<IActionResult> GetSpendMoney(int id)
        {
            var transactionList = await _context.Transactions.Where(u => (u.UserId == id && !u.IsSend) || (u.UserId1 == id && !u.IsSend) && u.Accepted).ToListAsync();
            return Ok(transactionList);
        }

        [HttpPut("cancel/{id}")]
        public async Task<IActionResult> CancelTransaction(int id, Transaction requestTransaction)
        {
            Transaction transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return BadRequest("Nu exista Tranzactia!");
            }
            transaction.Description = requestTransaction.Description;
            transaction.Value = requestTransaction.Value;
            var idUser = requestTransaction.UserId;
            var user = await _context.Users.FindAsync(idUser);
            if (requestTransaction.Unit == "$" && requestTransaction.IsSend && user.AreSumaD)
            {
                if (user.SumaDSpend - requestTransaction.Value >=0)
                {
                    user.SumaDSpend -= requestTransaction.Value;

                }
                transaction.Rejected = true;

            }
            else if (requestTransaction.Unit == "€" && requestTransaction.IsSend && user.AreSumaE)
            {
                if (user.SumaESpend - requestTransaction.Value >= 0)
                {
                    user.SumaESpend -= requestTransaction.Value;
                }
                transaction.Rejected = true;

            }
            else if (requestTransaction.Unit == "r" && requestTransaction.IsSend && user.AreSumaR)
            {
                if (user.SumaRSpend - requestTransaction.Value >= 0)
                {
                    user.SumaRSpend -= requestTransaction.Value;
                }
                transaction.Rejected = true;

            }

            await _context.SaveChangesAsync();
            return Ok(transaction);
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
            var idUser = requestTransaction.UserId1;
            var user = await _context.Users.FindAsync(idUser);
            if (requestTransaction.Unit == "$" && requestTransaction.IsSend && user.AreSumaD)
            {
                user.SumaD += requestTransaction.Value;
                transaction.Accepted = requestTransaction.Accepted;

            }
            else if (requestTransaction.Unit == "$" && !requestTransaction.IsSend && user.AreSumaD)
            {
                if (user.SumaD - user.SumaDSpend - requestTransaction.Value >= 0 )
                {
                    user.SumaDSpend += requestTransaction.Value;
                    transaction.Accepted = requestTransaction.Accepted;

                }
                else
                {
                    return Ok(false);
                }
            } else if (requestTransaction.Unit == "€" && requestTransaction.IsSend &&  user.AreSumaE)
            {
                user.SumaE += requestTransaction.Value;
                transaction.Accepted = requestTransaction.Accepted;

            }
            else  if (requestTransaction.Unit == "€" && !requestTransaction.IsSend && user.AreSumaE)
            { 
                if (user.SumaE - user.SumaESpend - requestTransaction.Value >= 0)
                {
                    user.SumaESpend += requestTransaction.Value;
                    transaction.Accepted = requestTransaction.Accepted;

                }
                else
                {
                    return Ok(false);

                }
            }
            else if (requestTransaction.Unit == "r" && requestTransaction.IsSend && user.AreSumaR)
            {
                user.SumaR += requestTransaction.Value;
                transaction.Accepted = requestTransaction.Accepted;

            }
            else if (requestTransaction.Unit == "r" && !requestTransaction.IsSend &&  user.AreSumaR)
            {
                if (user.SumaR - user.SumaRSpend -  requestTransaction.Value >= 0)
                {
                    user.SumaRSpend += requestTransaction.Value;
                    transaction.Accepted = requestTransaction.Accepted;

                }
                else
                {
                    return Ok(false);

                }
            }

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

        [HttpGet("getTransactionsForToday/{id}/{unit}")]
        public async Task<IActionResult> GetTransactionCurrentDay(int id, string unit)
        {
            var transactionList = await _context.Transactions.OrderByDescending(u => u.Date).Where(u => u.UserId == id || u.UserId1 == id).Where(d => (d.Date.Day == DateTime.Now.Day && d.Date.Month ==  DateTime.Now.Month && d.Date.Year == DateTime.Now.Year && d.Unit == unit))
                                        .Select(transaction => new
                                        {
                                            Transactions = transaction,
                                            User = (from user in _context.Users
                                                    where transaction.UserId1 == user.Id || transaction.UserId == user.Id
                                                    select user).ToList()

                                        }).ToListAsync();

            return Ok(transactionList);
        }



        [HttpGet("getTransactionsForWeek/{id}/{unit}")]
        public async Task<IActionResult> GetTransactionCurrentWeek(int id, string unit)
        {

            var transactionList = await _context.Transactions.OrderByDescending(u => u.Date).Where(u => u.UserId == id || u.UserId1 == id).Where(d => (d.Date.Month == DateTime.Now.Month && d.Date.Year == DateTime.Now.Year && d.Unit == unit))
                                        .Select(transaction => new
                                        {
                                            Transactions = transaction,
                                            User = (from user in _context.Users
                                                    where transaction.UserId1 == user.Id || transaction.UserId == user.Id
                                                    select user).ToList()

                                        }).ToListAsync();
            return Ok(transactionList);
        }

        [HttpGet("getTransactionsForMonth/{id}/{unit}")]
        public async Task<IActionResult> GetTransactionCurrentMonth(int id, string unit)
        {
            var transactionList = await _context.Transactions.OrderByDescending(u => u.Date).Where(u => u.UserId == id || u.UserId1 == id).Where(d => (d.Date.Month == DateTime.Now.Month && d.Date.Year == DateTime.Now.Year && d.Unit == unit))
                                        .Select(transaction => new
                                        {
                                            Transactions = transaction,
                                            User = (from user in _context.Users
                                                    where transaction.UserId1 == user.Id || transaction.UserId == user.Id
                                                    select user).ToList()

                                        }).ToListAsync();

            return Ok(transactionList);
        }

        [HttpGet("getTransactionsForYear/{id}/{unit}")]
        public async Task<IActionResult> GetTransactionCurrentYear(int id, string unit)
        {
            var transactionList = await _context.Transactions.OrderByDescending(u => u.Date).Where(u => u.UserId == id || u.UserId1 == id).Where(d => (d.Date.Year == DateTime.Now.Year && d.Unit == unit))
                                        .Select(transaction => new
                                        {
                                            Transactions = transaction,
                                            User = (from user in _context.Users
                                                    where transaction.UserId1 == user.Id || transaction.UserId == user.Id
                                                    select user).ToList()

                                        }).ToListAsync();
            return Ok(transactionList);
        }

        [HttpGet("getNotificationsForToday/{id}")]
        public async Task<IActionResult> GetNotificationsForToday(int id)
        {
            var transactionList = await _context.Transactions.Where(u => u.UserId == id || u.UserId1 == id).Where(d => (d.Date.Day == DateTime.Now.Day && d.Date.Month == DateTime.Now.Month && d.Date.Year == DateTime.Now.Year))
                                        .Select(transaction => new
                                        {
                                            Transactions = transaction,
                                            User = (from user in _context.Users
                                                   where transaction.UserId == user.Id
                                                    select user).ToList(),

                                            User1Name = (from user in _context.Users
                                                         where transaction.UserId1 == user.Id
                                                         select user.Name).ToList()

                                        }).ToListAsync();
            return Ok(transactionList);
        }

        [HttpGet("getNotificationsForYestarday/{id}")]
        public async Task<IActionResult> GetNotificationsForYestarday(int id)
        {
            var transactionList = await _context.Transactions.Where(u => u.UserId == id || u.UserId1 == id).Where(d => (d.Date.Day == DateTime.Now.Day - 1 && d.Date.Month == DateTime.Now.Month && d.Date.Year == DateTime.Now.Year))
                                        .Select(transaction => new
                                        {
                                            Transactions = transaction,
                                            User = (from user in _context.Users
                                                    where transaction.UserId == user.Id
                                                    select user).ToList(),
                                            User1Name = (from user in _context.Users
                                                         where transaction.UserId1 == user.Id
                                                         select user.Name).ToList()

                                        }).ToListAsync();
            return Ok(transactionList);
        }
        public int GetWeekNumber(DateTime date)
        {
            CultureInfo ciCurr = CultureInfo.CurrentCulture;
            int weekNum = ciCurr.Calendar.GetWeekOfYear(date, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
            return weekNum;
        }

        [HttpGet("getNotificationsForThisWeek/{id}")]
        public async Task<IActionResult> GetNotificationsForThisWeek(int id)
        {

            DateTimeFormatInfo dfi = DateTimeFormatInfo.CurrentInfo;
            DateTime date1 = new DateTime(2011, 1, 1);
            Calendar cal = dfi.Calendar;

          

            var transactionList = await _context.Transactions.Where(u => u.UserId == id || u.UserId1 == id).Where(d => ( d.Date.Month == DateTime.Now.Month && d.Date.Year == DateTime.Now.Year))
                                        .Select(transaction => new
                                        {
                                            Transactions = transaction,
                                            User = (from user in _context.Users
                                                    where transaction.UserId == user.Id
                                                    select user).ToList(),
                                            User1Name = (from user in _context.Users
                                                         where transaction.UserId1 == user.Id
                                                         select user.Name).ToList()

                                        }).ToListAsync();
            return Ok(transactionList);
        }



    }
}