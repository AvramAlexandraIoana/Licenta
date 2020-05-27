using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Ocsp;
using WebFMI.Data;
using WebFMI.Dtos;
using WebFMI.Models;

namespace WebFMI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IBankingRepository<User> _repo;

        public UsersController(ApplicationDbContext context, IBankingRepository<User> repo)
        {
            _context = context;
            _repo = repo;

        }
        
        //Get: api/users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var userList = await _context.Users
               .OrderBy(x => x.UserName)
               .Select(user => new
               {
                   Id = user.Id,
                   UserName = user.UserName,
                   Name = user.Name,
                   PhoneNumber = user.PhoneNumber,
                   ProfilePictureName = user.ProfilePictureName,
                   SumaR = user.SumaR,
                   SumaE = user.SumaE,
                   SumaD = user.SumaD,
                   SR = user.AreSumaR,
                   SD = user.AreSumaD,
                   SE = user.AreSumaE

               }).ToListAsync();

            return Ok(userList);

        }

        [HttpGet("index/{num1}/{num2}/{name}")]
        public async Task<ActionResult<IEnumerable<User>>> GetReviewLists1(int num1, int num2, string name)
        {
         
            if (name == "null")
            {
                return await _context.Users.Skip(num1).Take(num2).ToListAsync();

            } else
            {
                return await _context.Users.Where(u => u.Name.Contains(name)).Skip(num1).Take(num2).ToListAsync();
            }

        }

        [HttpGet("userTransactions/{id}")]
        public async Task<IActionResult> GetUsersFrecvent(int id)
        {
            var userList = await _context.Transactions.Where(u => u.UserId == id)
                .Select(trans => new
                {
                    User = (from user in _context.Users
                             where user.Id == trans.UserId1
                             select user.PhoneNumber).ToList()


                }).ToListAsync();
            return Ok(userList);
        }

        [HttpGet("allTransactions/{id}")]
        public async Task<IActionResult> GetTransactionForUser(int id)
        {
            var transactionList = await _context.Transactions.Where(u => u.UserId == id).ToListAsync();
            return Ok(transactionList);
        }

        [HttpGet("allIncomeTransaction/{id}")]
        public async Task<IActionResult> GetIncomeForUser(int id)
        {
            var incomeList = await _context.Transactions.Where(u => u.UserId1 == id).ToListAsync();
            return Ok(incomeList);
        }

        //GET: api/users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FindAsync(id);

            if (user == null)  
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/users/5
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditTransaction(int id, User requestedUser)
        {
            User user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return BadRequest("Nu exista Tranzactia!");
            }

            user.SumaD = requestedUser.SumaD;
            user.SumaE = requestedUser.SumaE;
            user.SumaR = requestedUser.SumaR;
            user.ProfilePictureName = requestedUser.ProfilePictureName;
            user.Adress = requestedUser.Adress;
            user.Adress1 = requestedUser.Adress1;
            user.Country = requestedUser.Country;
            user.Judet = requestedUser.Judet;
            user.City = requestedUser.City;
            user.PostalCode = requestedUser.PostalCode;
            user.UserName = requestedUser.UserName;
            user.DateOfBirth = requestedUser.DateOfBirth;
            user.Email = requestedUser.Email;
           

            await _context.SaveChangesAsync();
            return Ok(user);


        }

        // DELETE: api/BlogPosts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _repo.Delete(user);
            var save = await _repo.SaveAsync(user);

            return Ok(user);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        [HttpGet("getImagePath/{id}")]
        public async Task<IActionResult> GetImagePath(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user.ProfilePictureName);
        }



        [HttpPost("uploadImage")]
        public async Task<IActionResult> Upload(UploadImage uploadImage)
        {
            var user = await _context.Users.FindAsync(uploadImage.Id);
            if (user == null)
            {
                return NotFound();
            }

            user.ProfilePictureName = uploadImage.Url;
            user.ProfilePicturePath = uploadImage.Url;
            await _repo.SaveAsync(user);

            Response response = new Response
            {
               Success = true,
               ImageUrl = uploadImage.Url
            };

           return Ok(response);
           
        }

        [HttpPost("uploadImg/{id}"), DisableRequestSizeLimit]
        public async Task<IActionResult> UploadImage(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    user.ProfilePictureName = fileName;
                    user.ProfilePicturePath = dbPath;
                    await _repo.SaveAsync(user);


                    Response response = new Response
                    {
                        Success = true,
                        ImageUrl = fileName
                    };

                    return Ok(response);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpGet("getImageProfile/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var imageUrl = "T:\\Licenta\\WebFMI\\Resources\\Images\\" + user.ProfilePictureName;

            var image = System.IO.File.OpenRead(imageUrl);
            return File(image, "image/jpeg");
        }

        [HttpPost("postImagePath")]
        public async Task<IActionResult> PostImagePath(UploadImage uploadImage)
        {

            var user = await _context.Users.FindAsync(uploadImage.Id);
            if (user == null)
            {
                return NotFound();
            }

            user.ProfilePictureName = uploadImage.Url;
            user.ProfilePicturePath = uploadImage.Url;
            await _repo.SaveAsync(user);

            Response response = new Response
            {
                Success = true,
                ImageUrl = uploadImage.Url
            };

            return Ok(response);

        }



    }

    public class Response
    {

        public bool Success;
        public string ImageUrl;
    }

 
}


