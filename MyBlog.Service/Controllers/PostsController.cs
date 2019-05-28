﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public async Task<IActionResult> PutPost(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _context.Entry(post).State = EntityState.Modified;

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
