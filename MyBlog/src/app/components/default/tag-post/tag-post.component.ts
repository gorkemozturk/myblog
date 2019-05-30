import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tag-post',
  templateUrl: './tag-post.component.html',
  styleUrls: ['./tag-post.component.css']
})
export class TagPostComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPostsByTag();
  }

  getPostsByTag(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.getPostsByTag(id).subscribe(response => this.posts = response.filter(p => p.isPublished === true));
  }

}
