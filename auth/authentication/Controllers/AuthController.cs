using authentication.DbContext;
using authentication.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace authentication.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        public AuthController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserRequestModel model)
        {
            var result = await _userManager.CreateAsync(new ApplicationUser()
            {
                Email = model.Email,
                UserName = model.Email
            });

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors.FirstOrDefault().Description);
            }

            var user = await _userManager.FindByEmailAsync(model.Email);

            string token = await _userManager.GeneratePasswordResetTokenAsync(user);

            result = await _userManager.ResetPasswordAsync(user, token, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors.FirstOrDefault().Description);
            }

            return Ok(true);
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserRequestModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                return BadRequest("Kullanıcı Bulunamadı!");
            }

            bool signedIn = await _userManager.CheckPasswordAsync(user, model.Password);

            if (!signedIn)
            {
                return BadRequest("Hatalı Şifre");
            }

            var tokenResponse = TokenHandler.CreateAccessToken(user.Email, user.Id);

            return Ok(tokenResponse);
        }

    }
}
