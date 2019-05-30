import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year: string = new Date().toLocaleDateString('tr', { year: 'numeric' });;
  tags: any[] = [];

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.getTags();
  }

  getTags(): void {
    this.tagService.getResources().subscribe(response => this.tags = response);
  }

}
