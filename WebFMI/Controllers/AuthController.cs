using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using sinkien.IBAN4Net;
using WebFMI.Data;
using WebFMI.Dtos;
using WebFMI.Models;

namespace WebFMI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;

        private readonly IBankingRepository<User> _repo1;

        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        private readonly IEmailSender _emailSender;
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context, IBankingRepository<User> repo1, IAuthRepository repo, IConfiguration config,
            UserManager<User> userManager, SignInManager<User> signInManager, IEmailSender emailSender)
        {
            this._context = context;
            this._repo1 = repo1;
            _config = config;
            this._userManager = userManager;
            this._signInManager = signInManager;
            _repo = repo;
            _emailSender = emailSender;

        }

        [HttpPost("sendEmail")]
        public async Task<IActionResult> SendEmail(UserForRegisterDto userForRegisterDto)
        {

            var subject = "Email Test";

            var body = "This is a test message.";

            await _emailSender.SendEmailAsync(userForRegisterDto.Email, subject, body);
            return Ok(201);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            if (await _repo.UserExists(userForRegisterDto.Username))
            {
                return BadRequest("Username already exists");
            }

            var userToCreate = new User
            {
                Name = userForRegisterDto.Username,
                UserName = userForRegisterDto.Username,
                NormalizedUserName = userForRegisterDto.Username,
                NormalizedEmail = userForRegisterDto.Email,
                Email = userForRegisterDto.Email,
                SecurityStamp = Guid.NewGuid().ToString()

            };

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            AddNewCardModel addNewCard = new AddNewCardModel();
            addNewCard.CardHolderName = createdUser.UserName;
            addNewCard.ConversionMoney = "RON";
            var account = await AddNewCard(addNewCard, createdUser.Id);

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(createdUser);
            var confirmationLink = Url.Action(nameof(ConfirmEmail), "Account", new { token, name = createdUser.UserName }, Request.Scheme);
            //await _emailSender.SendEmailAsync(userForRegisterDto.Email, "Test message", confirmationLink);


           
            return Ok(201);


        }

        public async Task<Account> AddNewCard(AddNewCardModel card, int id)
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
                user.DefaultCard = "r";
            }
            else if (card.ConversionMoney == "USD")
            {
                user.AreSumaD = true;
                user.DefaultCard = "$";

            }
            else
            {
                user.AreSumaE = true;
                user.DefaultCard = "€";
            }
            var validate = account.AccountNumber.Substring(0, 10);
            // How to generate IBAN:
            Iban iban = new IbanBuilder()
                 .CountryCode(CountryCode.GetCountryCode("CZ"))
                 .BankCode("0800")
                 .AccountNumberPrefix("000019")
                 .AccountNumber(account.AccountNumber.Substring(0, 10))
                 .Build();
            account.Iban = iban.ToString();
            _repo1.Update(user);
            var save = await _repo1.SaveAsync(user);
            account.UserId = id;
            account.CardHolderName = card.CardHolderName;

            DateTime expiryDate = DateTime.Now.AddYears(3);
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
                return account;
            }
            catch (Exception e)
            {
            }

            return null;
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {


            var userFromRepo = await _repo.Login(userForLoginDto.UserName.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
            {
                return Unauthorized();
            }

             return Ok(new
             {
               token = GenerateJwtToken(userFromRepo).Result
             });    
        }

        [HttpPost("googleLogin")]
        public async Task<IActionResult> GoogleLogin(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Password = "googleLogin";
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            if (await _repo.UserExists(userForRegisterDto.Username))
            {
                var user = await _repo.Login(userForRegisterDto.Username.ToLower(), userForRegisterDto.Password);

                if (user == null)
                {
                    return Unauthorized();
                }

                return Ok(new
                {
                    token = GenerateJwtToken(user).Result
                });
            }

            var userToCreate = new User
            {
                Name = userForRegisterDto.Username,
                UserName = userForRegisterDto.Username,
                NormalizedUserName = userForRegisterDto.Username,
                NormalizedEmail = userForRegisterDto.Email,
                Email = userForRegisterDto.Email,
                SecurityStamp = Guid.NewGuid().ToString()

            };

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            AddNewCardModel addNewCard = new AddNewCardModel();
            addNewCard.CardHolderName = createdUser.UserName;
            addNewCard.ConversionMoney = "RON";
            var account = await AddNewCard(addNewCard, createdUser.Id);

            var userFromRepo = await _repo.Login(userForRegisterDto.Username.ToLower(), userForRegisterDto.Password);

            if (userFromRepo == null)
            {
                return Unauthorized();
            }

            return Ok(new
            {
                token = GenerateJwtToken(userFromRepo).Result
            });
        }

        [HttpGet("confirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string token, string name)
        {
            var user = await _userManager.FindByNameAsync(name);
            if (user == null)
            {
                return BadRequest("Nu e un mail valid");
            }
                

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return StatusCode(210);

            }

            return BadRequest("Nu e bine");
        }

        [HttpGet("getRoles/{id}")]
        public async Task<IActionResult> GetRoles(int id)
        {
            var userRoles = await _context.Users
               .Where(u => u.Id == id)
               .Select(user => new
               {
                   Id = user.Id,
                   UserName = user.UserName,
                   City = user.City,
                   PhoneNumber = user.PhoneNumber,
                   Roles = (from userRole in _context.UserRoles
                            join role in _context.Roles
                            on userRole.RoleId
                            equals role.Id
                            where userRole.UserId == user.Id
                            select role.Name).ToList()
               }).ToListAsync();
            return Ok(userRoles[0].Roles);

        }
       

        [HttpPost("forgotPassword")]
       // [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordModel forgotPasswordModel)
        {
       
            var user = await _userManager.FindByEmailAsync(forgotPasswordModel.Email);
            if (user == null)
            {
                return BadRequest("Error");

            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            //var confirmationLink = Url.Action(nameof(ResetPassword), "Account", new { token, email = user.Email }, Request.Scheme);

            //var confirmationLink = "http://localhost:8100/reset-password?token=" + token + "&email=" + user.Email;
            var confirmationLink = "ur message : <a href='http://www.yoursite.com'></a>";

            await _emailSender.SendEmailAsync(user.Email, "Recover password", confirmationLink);
                
            return Ok(201);

        }

        /*[HttpPost("resetPassword")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPasswordModel resetPasswordModel)
        {

            var user = await _userManager.FindByEmailAsync(resetPasswordModel.Email);
            if (user == null)
                return BadRequest("Nu se poate reseta parola");

            var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPasswordModel.Token, resetPasswordModel.Password);
            if (!resetPassResult.Succeeded)
            {
                return BadRequest("Nu se poate reseta parola");

            }

            return StatusCode(201);
        }*/

        [HttpPost("resetPasswordFromProfile")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword1(ResetPasswordModel resetPasswordModel)
        {

            var user = await _userManager.FindByIdAsync((resetPasswordModel.Id).ToString());
            if (user == null)
                return BadRequest("Nu se poate reseta parola");
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var resetPassResult = await _userManager.ResetPasswordAsync(user, token, resetPasswordModel.Password);
            if (!resetPassResult.Succeeded)
            {
                return BadRequest("Nu se poate reseta parola");

            }

            return StatusCode(201);
        }


        public async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
              {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };


            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }


      





    }
}