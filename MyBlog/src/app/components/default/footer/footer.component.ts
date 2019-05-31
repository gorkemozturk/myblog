import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year: string = new Date().toLocaleDateString('tr', { year: 'numeric' });;
  tags: any[] = [];
  configuration: any = new Object();

  constructor(private tagService: TagService,  private configurationService: ConfigurationService) { }

  ngOnInit() {
    this.getTags();
    this.getConfiguration();
  }

  getTags(): void {
    this.tagService.getResources().subscribe(response => this.tags = response);
  }

  getConfiguration(): void {
    this.configurationService.getConfiguration().subscribe(response => this.configuration = response);
  }

}
