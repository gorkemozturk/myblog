import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-admin-tag-form',
  templateUrl: './admin-tag-form.component.html',
  styleUrls: ['./admin-tag-form.component.css']
})
export class AdminTagFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data, private tagService: TagService) { }

  ngOnInit() {
  }

  onSubmit(): void {
    console.log('submit')
  }

}
