using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBlog.Service.Data;
using MyBlog.Service.Models;
using MyBlog.Service.Models.ViewModels.Users;

namespace MyBlog.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<IEnumerable<UserListViewModel>> GetUsers()
        {
            return await _context.ApplicationUsers.Select(u => new UserListViewModel {
                FirstName = u.FirstName,
                LastName = u.LastName
            }).ToListAsync();
        }
    }
}
