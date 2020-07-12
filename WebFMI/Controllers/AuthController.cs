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
      

        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        private readonly IEmailSender _emailSender;

        public AuthController(IAuthRepository repo, IConfiguration config,
            UserManager<User> userManager, SignInManager<User> signInManager, IEmailSender emailSender)
        {
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

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(createdUser);
            var confirmationLink = Url.Action(nameof(ConfirmEmail), "Account", new { token, name = createdUser.UserName }, Request.Scheme);
            await _emailSender.SendEmailAsync(userForRegisterDto.Email, "Test message", confirmationLink);


           
            return Ok(201);


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
            var user = Register(userForRegisterDto);

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