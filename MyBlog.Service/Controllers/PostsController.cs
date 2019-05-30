using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBlog.Service.Data;
using MyBlog.Service.Models;
using MyBlog.Service.Models.ViewModels.Post;
using MyBlog.Service.Models.ViewModels.Tag;

namespace MyBlog.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PostsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostListViewModel>>> GetPosts()
        {
            return await _context.Posts.Include(p => p.Owner).Select(p => new PostListViewModel
            {
                Id = p.Id,
                Title = p.Title,
                Slug = p.Slug,
                Summary = p.Summary,
                PublishedAt = p.PublishedAt,
                IsPublished = p.IsPublished,
                Owner = p.Owner.FullName(),
                Tags = p.Tags.Select(t => new TagViewModel
                {
                    Id = t.Tag.Id,
                    TagName = t.Tag.TagName
                })
            }).ToListAsync();
        }

        // GET: api/Posts/Tag/5
        [HttpGet("tag/{id}")]
        public async Task<ActionResult<IEnumerable<PostListViewModel>>> GetPostsByTag(int id)
        {
            return await _context.PostTags.Include(p => p.Post).Where(p => p.TagId == id).Select(p => new PostListViewModel
            {
                Id = p.Post.Id,
                Title = p.Post.Title,
                Slug = p.Post.Slug,
                Summary = p.Post.Summary,
                PublishedAt = p.Post.PublishedAt,
                IsPublished = p.Post.IsPublished,
                Owner = p.Post.Owner.FullName(),
                Tags = p.Post.Tags.Select(t => new TagViewModel
                {
                    Id = t.Tag.Id,
                    TagName = t.Tag.TagName
                })
            }).ToListAsync();
        }

        // GET: api/Posts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PostDetailViewModel>> GetPost(int id)
        {
            var post = await _context.Posts.Include(p => p.Owner).Select(p => new PostDetailViewModel
            {
                Id = p.Id,
                Title = p.Title,
                Slug = p.Slug,
                Summary = p.Summary,
                Body = p.Body,
                PublishedAt = p.PublishedAt,
                Owner = p.Owner.FullName(),
                IsPublished = p.IsPublished,
                Tags = p.Tags.Select(t => new TagViewModel
                {
                    Id = t.Tag.Id,
                    TagName = t.Tag.TagName
                })
            }).FirstOrDefaultAsync(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        // PUT: api/Posts/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutPost(int id, PostUpdateViewModel model)
        {
            if (id != model.Id)
            {
                return BadRequest();
            }

            var post = await _context.Posts.Include(p => p.Tags).FirstOrDefaultAsync(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            post.Title = model.Title;
            post.Slug = model.Slug;
            post.Summary = model.Summary;
            post.Body = model.Body;
            post.IsPublished = model.IsPublished;

            foreach (var tag in post.Tags)
            {
                _context.PostTags.Remove(tag);
            }

            foreach (var t in model.Tags)
            {
                var postTag = new PostTag() { PostId = post.Id, TagId = t };
                _context.PostTags.Add(postTag);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Posts
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PostCreateViewModel>> PostPost(PostCreateViewModel model)
        {
            var post = new Post()
            {
                UserId = model.UserId,
                Title = model.Title,
                Slug = model.Slug,
                Summary = model.Summary,
                Body = model.Body,
                IsPublished = model.IsPublished,
                PublishedAt = DateTime.Now
            };

            _context.Posts.Add(post);

            foreach (var id in model.Tags)
            {
                var postTag = new PostTag() { PostId = post.Id, TagId = id };
                _context.PostTags.Add(postTag);
            }

            await _context.SaveChangesAsync();

            return model;
        }

        // DELETE: api/Posts/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Post>> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return post;
        }

        private bool PostExists(int id)
        {
            return _context.Posts.Any(e => e.Id == id);
        }
    }
}
