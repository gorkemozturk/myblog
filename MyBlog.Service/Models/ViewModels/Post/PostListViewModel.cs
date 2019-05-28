using MyBlog.Service.Models.ViewModels.Tag;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyBlog.Service.Models.ViewModels.Post
{
    public class PostListViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Summary { get; set; }
        public DateTime PublishedAt { get; set; }
        public bool IsPublished { get; set; }
        public string Owner { get; set; }
        public IEnumerable<TagViewModel> Tags { get; set; }
    }
}
