import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
    AdminPostFormComponent
  ],
  imports: [
    BrowserModule,
    ApplicationRoutes,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
