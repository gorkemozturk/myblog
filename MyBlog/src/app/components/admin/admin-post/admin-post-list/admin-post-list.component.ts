import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-admin-post-list',
  templateUrl: './admin-post-list.component.html',
  styleUrls: ['./admin-post-list.component.css']
})
export class AdminPostListComponent implements OnInit {
  title: string = 'Makaleler';
  posts: any[] = [];
  p: number = 1;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getResources().subscribe(response => this.posts = response);
  }

  onDelete(post: any): void {
    this.postService.deleteResource(post.id).subscribe(response => {
      const index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    });
  }

}
