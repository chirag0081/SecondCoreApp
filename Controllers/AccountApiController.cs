using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
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
        private readonly IConfiguration _config;

        public AccountApiController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration config)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this._config = config;
        }


        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            List<string> errors = new List<string>();
            if (ModelState.IsValid)
            {
                //var result = await signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, false);
                ApplicationUser user = await userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    errors.Add("Invalid user name.");
                    return Ok(new
                    {
                        succeeded = false,
                        errors = errors
                    });
                }

                var IsValid = await userManager.CheckPasswordAsync(user, model.Password);

                if (IsValid)
                {
                    IList<string> userRoles = await userManager.GetRolesAsync(user);
                    IList<Claim> userClaims = await userManager.GetClaimsAsync(user);

                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                    var tokeOptions = new JwtSecurityToken(
                        issuer: _config["Jwt:Issuer"],
                        audience: _config["Jwt:Audience"],
                        claims: userClaims,
                        expires: DateTime.Now.AddMinutes(3),
                        signingCredentials: signinCredentials
                    );


                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                    return Ok(new
                    {
                        succeeded = true,
                        Token = tokenString,
                        user = new { userName = user.UserName, email = user.Email, city = user.City },
                        roles = userRoles,
                        claim = userClaims
                    });

                    //return Ok(new
                    //{
                    //    succeeded = true,
                    //    user = new { userName = user.UserName, email = user.Email, city = user.City }
                    //});

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