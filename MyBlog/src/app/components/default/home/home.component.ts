import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  p: number = 1;
  posts: any[] = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getResources().subscribe(response => this.posts = response.filter(p => p.isPublished === true));
  }

}
