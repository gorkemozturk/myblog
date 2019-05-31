using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyBlog.Service.Models
{
    public class Configuration
    {
        public string Url { get; set; }
        public string Version { get; set; }
        public string Copyright { get; set; }
        public string Key { get; set; }
        public string Description { get; set; }
        public string GitHub { get; set; }
        public string LinkedIn { get; set; }
    }
}
