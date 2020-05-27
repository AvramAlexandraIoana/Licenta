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
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IBankingRepository<User> _repo;

        public AccountController(ApplicationDbContext context, IBankingRepository<User> repo)
        {
            this._context = context;
            _repo = repo;

        }

        [HttpGet("getAllCards/{id}")]
        public async Task<IActionResult> GetAllCard(int id)
        {
            var accountList = await _context.Accounts.Where(u => u.UserId == id).ToListAsync();
            return Ok(accountList);

        }

        [HttpPost("new/{id}")]

        public async Task<IActionResult> AddNewCard(AddNewCardModel card, int id)
        {

            var chars = "0123456789";
            var cardNumbers = new char[16];
            var random = new Random();

            for (int i = 0; i < cardNumbers.Length; i++)
            {
                cardNumbers[i] = chars[random.Next(chars.Length)];
            }

            var cardNumber = new String(cardNumbers);

            Account account = new Account();
            account.AccountNumber = cardNumber;



            User user = await _context.Users.FindAsync(id);
            if (card.ConversionMoney == "RON")
            {
                user.AreSumaR = true;
            } else if (card.ConversionMoney == "USD")
            {
                user.AreSumaD = true;
            } else
            {
                user.AreSumaE = true;
            }

            _repo.Update(user);
            var save = await _repo.SaveAsync(user);
            account.UserId = id;
            account.CardHolderName = card.CardHolderName;

            DateTime  expiryDate = DateTime.Now.AddYears(3);
            string formatted = expiryDate.ToString("MM/yy");
            account.ExpiryDate = formatted;

            var securityCodes = new char[3];

            for (int i = 0; i < securityCodes.Length; i++)
            {
                securityCodes[i] = chars[random.Next(chars.Length)];
            }

            var securityCode = new String(securityCodes);

            account.SecurityCode = securityCode;
            account.Conversion = card.ConversionMoney;

            try
            {
                var acc = await _context.Accounts.AddAsync(account);
                await _context.SaveChangesAsync();
                return Ok(201);
            }
            catch (Exception e)
            {
                return BadRequest("Eroare de la baza de date");
            }
        }


        [HttpDelete("delete/{id}")]

        public async Task<IActionResult> DeleteCard(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return BadRequest("Nu exista cardul!");
            }
            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();
            return Ok(201);

        }
    }
}
