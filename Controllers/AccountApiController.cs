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

        //[HttpPost]
        [HttpGet]
        [Route("login")]
        [AllowAnonymous]
        //public async Task<IActionResult> Login(LoginViewModel model)
        public async Task<OkObjectResult> Login(string email,string password)
        {
            if (ModelState.IsValid)
            {
                //var result = await signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, false);
                var result = await signInManager.PasswordSignInAsync(email, password, false, false);
                if (result.Succeeded)
                {
                    return Ok(result.Succeeded);

                }

                ModelState.AddModelError("", "Invalid Login Attempt");
            }

            return Ok(ModelState.IsValid);
        }

    }
}