import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  page: any = new Object();

  constructor(private pageService: PageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pageService.getResource(id).subscribe(response => this.page = response);
  }

}
