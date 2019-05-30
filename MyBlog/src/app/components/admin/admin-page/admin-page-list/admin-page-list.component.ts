import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-admin-page-list',
  templateUrl: './admin-page-list.component.html',
  styleUrls: ['./admin-page-list.component.css']
})
export class AdminPageListComponent implements OnInit {
  title: string = 'Sayfalar';
  pages: any[] = [];

  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.pageService.getResources().subscribe(response => this.pages = response);
  }

  onDelete(page: any): void {
    this.pageService.deleteResource(page.id).subscribe(response => {
      const index = this.pages.indexOf(page);
      this.pages.splice(index, 1);
    });
  }

}
