using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Language.V1;
using Google.Cloud.Translation.V2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebFMI.Data;
using WebFMI.Models;

namespace WebFMI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly TranslationClient client;

        public ReviewController(ApplicationDbContext context)
        {
            this._context = context;
            string credential_path = "T:/Ioana/Downloads/My Project 79292-181c565ffbe1.json";
            System.Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", credential_path);
            client = TranslationClient.Create();

        }

        public string TranslateText(string text, string language)
        {
            var response = client.TranslateText(text, language);
            return response.TranslatedText;
        }

        [HttpGet("index")]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviewList()
        {

            return await _context.Reviews.ToListAsync();
        }

        [HttpGet("reviewIndex")]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviewLists()
        {
            

            return await _context.Reviews.ToListAsync();
        }

        [HttpGet("reviewIndex/{num1}/{num2}/{sort}/{name}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviewLists1(int num1, int num2, int sort, string name)
        {
            if (sort == 0 && name == "null")
            {
                return await _context.Reviews.Skip(num1).Take(num2).ToListAsync();
            }
            else if (sort == 1 && name == "null")
            {
                return await _context.Reviews.OrderByDescending(u => u.CreatedOn).Skip(num1).Take(num2).ToListAsync();
            } else  if (sort == 0)
            {
                return await _context.Reviews.Where(u => u.Type == name).Skip(num1).Take(num2).ToListAsync();
            } else
            {
                return await _context.Reviews.OrderByDescending(u => u.CreatedOn).Where(u => u.Type == name).Skip(num1).Take(num2).ToListAsync();

            }

        }


        [HttpGet("filter/{name}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviewFilter(string name)
        {


            return await _context.Reviews.Where(u => u.Type == name).ToListAsync();
        }


        [HttpGet("show/{id}")]
        public async Task<IActionResult> ShowReview(int id)
        {
            Review review = await _context.Reviews.FindAsync(id);
            return Ok(review);

        }


        [HttpPost("new")]
        public async Task<IActionResult> Create(Review review)
        {
            var translatedText = TranslateText(review.FeedbackR, "en");
            review.FeedbackE = translatedText;

            var client = LanguageServiceClient.Create();
            var response = client.AnalyzeSentiment(Document.FromPlainText(translatedText));
            var sentiment = response.DocumentSentiment;
            Console.WriteLine($"Score: {sentiment.Score}");
            Console.WriteLine($"Magnitude: {sentiment.Magnitude}");

            review.Score = sentiment.Score;

            try
            {
             
                review.CreatedOn = DateTime.Now;
                var rev = await _context.Reviews.AddAsync(review);
                await _context.SaveChangesAsync();
                return Ok(201);
            }
            catch (Exception e)
            {
                return BadRequest("Eroare de la baza de date");
            }

        }




        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return BadRequest("Nu exista categoria!");
            }
            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
            return StatusCode(201);
        }

    }
}
