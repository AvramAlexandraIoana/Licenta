using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using WebFMI.Data;
using WebFMI.Models;

namespace WebFMI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
             {
                 var services = scope.ServiceProvider;
                 try
                 {
                     var context = services.GetRequiredService<ApplicationDbContext>();
                     var userManager = services.GetRequiredService<UserManager<User>>();
                     var roleManager = services.GetRequiredService<RoleManager<Role>>();

                    //context.Database.Migrate();

                     Seed.SeedUsers(context, userManager, roleManager);
                 }
                 catch (Exception ex)
                 {
                     var logger = services.GetRequiredService<ILogger<Program>>();
                     logger.LogError(ex, "An error occured during migration");
                 }
             }
            host.Run();

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
