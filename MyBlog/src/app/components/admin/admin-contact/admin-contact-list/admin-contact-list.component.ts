import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminContactViewComponent } from '../admin-contact-view/admin-contact-view.component';

@Component({
  selector: 'app-admin-contact-list',
  templateUrl: './admin-contact-list.component.html',
  styleUrls: ['./admin-contact-list.component.css']
})
export class AdminContactListComponent implements OnInit {
  title: string = 'İletişim';
  contacts: any[] = [];

  constructor(private contactService: ContactService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getResources().subscribe(response => this.contacts = response);
  }

  onDelete(post: any): void {
    this.contactService.deleteResource(post.id).subscribe(response => {
      const index = this.contacts.indexOf(post);
      this.contacts.splice(index, 1);
    });
  }

  openContactEntry(contact: any): void {
    const dialogRef = this.dialog.open(AdminContactViewComponent, {
      panelClass: 'customized-dialog',
      disableClose: false,
      autoFocus: false,
      data: { contact }
    });
  }

}
