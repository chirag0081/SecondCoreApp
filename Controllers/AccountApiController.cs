using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SecondCoreApp.Models;
using SecondCoreApp.ViewModels;

namespace SecondCoreApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountApiController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;

        public AccountApiController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }


        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            List<string> errors = new List<string>();
            if (ModelState.IsValid)
            {
                var result = await signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, false);
                if (result.Succeeded)
                {
                    ApplicationUser user = await userManager.FindByEmailAsync(model.Email); 
                    return Ok(new
                    {
                        succeeded = true,
                        user = new { userName = user.UserName, email = user.Email, city = user.City }
                    });

                }

                errors.Add("Invalid Login Attempt");
            }

            //return Ok(ModelState);
            return Ok(new
            {
                succeeded = false,
                errors = errors
            });
        }

        [HttpPost]
        [Route("logout")]
        [AllowAnonymous]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok();
        }
    }
}