import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PageService } from 'src/app/services/page.service';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  pages: any[] = [];
  configuration: any = new Object();

  constructor(private authService: AuthService, private pageService: PageService, private configurationService: ConfigurationService) { }

  ngOnInit() {
    this.getPrimaryPages();
    this.getConfiguration();
  }

  getPrimaryPages(): void {
    this.pageService.getResources().subscribe(response => this.pages = response.filter(p => p.isPrimary === true && p.isPublished === true));
  }

  getConfiguration(): void {
    this.configurationService.getConfiguration().subscribe(response => this.configuration = response);
  }

}
