using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MyBlog.Service.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string UserId { get; set; }

        [Required]
        [MaxLength(150)]
        public string Title { get; set; }

        [Required]
        [MaxLength(150)]
        public string Slug { get; set; }

        [Required]
        [MaxLength(250)]
        public string Summary { get; set; }

        [Required]
        public string Body { get; set; }
        public bool IsPublished { get; set; }
        public DateTime PublishedAt { get; set; }

        [ForeignKey("UserId")]
        public ApplicationUser Owner { get; set; }
        public ICollection<PostTag> Tags { get; set; }
    }
}
