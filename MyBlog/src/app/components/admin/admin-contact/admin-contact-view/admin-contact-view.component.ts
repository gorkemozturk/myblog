import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-contact-view',
  templateUrl: './admin-contact-view.component.html',
  styleUrls: ['./admin-contact-view.component.css']
})
export class AdminContactViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
  }

}
