import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: any = new Object();
  posts: any = [];

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPost();
    this.getRandomPosts();
  }

  getPost(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.getResource(id).subscribe(response => this.post = response);
  }

  getRandomPosts(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.getResources().subscribe(response => this.posts = response.filter(p => ((p, index) => index < 5) && p.id != id));
  }

}
