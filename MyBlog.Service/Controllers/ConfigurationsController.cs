using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBlog.Service.Models;

namespace MyBlog.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigurationsController : ControllerBase
    {
        private readonly Configuration _configuration;

        public ConfigurationsController(Configuration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public Configuration GetConfiguration()
        {
            return _configuration;
        }
    }
}