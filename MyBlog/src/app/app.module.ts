import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CKEditorModule } from 'ng2-ckeditor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { DefaultComponent } from './layouts/default/default.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { HeaderComponent } from './components/default/header/header.component';
import { FooterComponent } from './components/default/footer/footer.component';
import { HomeComponent } from './components/default/home/home.component';
import { ApplicationRoutes } from './app.route';
import { LoginComponent } from './components/auth/login/login.component';
import { InstallComponent } from './components/auth/install/install.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AdminPostListComponent } from './components/admin/admin-post/admin-post-list/admin-post-list.component';
import { AdminPostFormComponent } from './components/admin/admin-post/admin-post-form/admin-post-form.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminFooterComponent } from './components/admin/admin-footer/admin-footer.component';
import { PostComponent } from './components/default/post/post.component';
import { ArchiveComponent } from './components/default/archive/archive.component';
import { ContactComponent } from './components/default/contact/contact.component';
import { AdminTagFormComponent } from './components/admin/admin-tag-form/admin-tag-form.component';
import { AdminContactListComponent } from './components/admin/admin-contact/admin-contact-list/admin-contact-list.component';
import { AdminContactViewComponent } from './components/admin/admin-contact/admin-contact-view/admin-contact-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    AuthComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    InstallComponent,
    AdminHeaderComponent,
    AdminPostListComponent,
    AdminPostFormComponent,
    AdminDashboardComponent,
    AdminFooterComponent,
    PostComponent,
    ArchiveComponent,
    ContactComponent,
    AdminTagFormComponent,
    AdminContactListComponent,
    AdminContactViewComponent
  ],
  imports: [
    BrowserModule,
    ApplicationRoutes,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [
    AdminTagFormComponent,
    AdminContactViewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
