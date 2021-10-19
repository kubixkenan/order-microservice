using authentication.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace authentication
{
    public class TokenHandler
    {
        public static IConfiguration _configuration;
        public static TokenResponseModel CreateAccessToken(string name, string userId)
        {
            SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:Security"]));
            TokenValidationParameters tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = symmetricSecurityKey,
                ValidateIssuer = true,
                ValidIssuer = _configuration["JWT:Issuer"],
                ValidateAudience = true,
                ValidAudience = _configuration["JWT:Audience"],
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,
                RequireExpirationTime = true
            };
            DateTime now = DateTime.UtcNow;
            JwtSecurityToken jwt = new JwtSecurityToken(
                     issuer: _configuration["JWT:Issuer"],
                     audience: _configuration["JWT:Audience"],
                     claims: new List<Claim> {
                      new Claim(ClaimTypes.Name, name),
                      new Claim("userId", userId)
                     },
                     notBefore: now,
                     expires: now.AddDays(1),
                     signingCredentials: new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256)
                 );
            return new TokenResponseModel
            {
                Token = new JwtSecurityTokenHandler().WriteToken(jwt),
                Expires = DateTime.Now.AddDays(1)
            };
        }
    }
}
