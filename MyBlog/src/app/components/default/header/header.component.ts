import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  pages: any[] = [];

  constructor(private authService: AuthService, private pageService: PageService) { }

  ngOnInit() {
    this.getPrimaryPages();
  }

  getPrimaryPages(): void {
    this.pageService.getResources().subscribe(response => this.pages = response.filter(p => p.isPrimary === true));
  }

}
