using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace authentication.DbContext
{
    public class ApplicationIdentityContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public ApplicationIdentityContext(DbContextOptions<ApplicationIdentityContext> options) : base(options)
        {
        }
    }
}
