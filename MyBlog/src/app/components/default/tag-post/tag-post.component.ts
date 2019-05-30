import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tag-post',
  templateUrl: './tag-post.component.html',
  styleUrls: ['./tag-post.component.css']
})
export class TagPostComponent implements OnInit {
  posts: any[] = [];
  tag: any = new Object();

  constructor(private postService: PostService, private tagService: TagService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPostsByTag();
    this.getTag();
  }

  getPostsByTag(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.getPostsByTag(id).subscribe(response => this.posts = response.filter(p => p.isPublished === true));
  }

  getTag(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.tagService.getResource(id).subscribe(response => this.tag = response);
  }

}
