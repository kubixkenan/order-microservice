using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace authentication.Models
{
    public class UserRequestModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
