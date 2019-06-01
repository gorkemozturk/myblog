import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/default/home/home.component';
import { DefaultComponent } from './layouts/default/default.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { InstallComponent } from './components/auth/install/install.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { AdminPostListComponent } from './components/admin/admin-post/admin-post-list/admin-post-list.component';
import { AdminPostFormComponent } from './components/admin/admin-post/admin-post-form/admin-post-form.component';
import { PostComponent } from './components/default/post/post.component';
import { ArchiveComponent } from './components/default/archive/archive.component';
import { ContactComponent } from './components/default/contact/contact.component';
import { AdminContactListComponent } from './components/admin/admin-contact/admin-contact-list/admin-contact-list.component';
import { PageComponent } from './components/default/page/page.component';
import { AdminPageListComponent } from './components/admin/admin-page/admin-page-list/admin-page-list.component';
import { AdminPageFormComponent } from './components/admin/admin-page/admin-page-form/admin-page-form.component';
import { TagPostComponent } from './components/default/tag-post/tag-post.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { NotFoundComponent } from './components/default/not-found/not-found.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'admin', redirectTo: '/admin/dashboard', pathMatch: 'full' },

    // Default Routes
    { path: '', component: DefaultComponent, children: [ 
        { path: 'home', component: HomeComponent },
        { path: 'tag/:id/posts', component: TagPostComponent },
        { path: 'post/:id/:slug', component: PostComponent },
        { path: 'page/:id/:slug', component: PageComponent },
        { path: 'archive', component: ArchiveComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'not-found', component: NotFoundComponent }
    ]},
    
    // Auth Routes
    { path: '', component: AuthComponent, children: [ 
        { path: 'login', component: LoginComponent, canActivate: [ LoginGuard ] },
        { path: 'install', component: InstallComponent, canActivate: [ LoginGuard ] }
    ]},

    // Admin Routes
    { path: 'admin', component: AdminComponent, children: [ 
        { path: 'dashboard', component: AdminDashboardComponent, canActivate: [ AuthGuard ] },
        { path: 'posts', component: AdminPostListComponent, canActivate: [ AuthGuard ] },
        { path: 'posts/new', component: AdminPostFormComponent, canActivate: [ AuthGuard ] },
        { path: 'posts/edit/:id', component: AdminPostFormComponent, canActivate: [ AuthGuard ] },
        { path: 'pages', component: AdminPageListComponent, canActivate: [ AuthGuard ] },
        { path: 'pages/new', component: AdminPageFormComponent, canActivate: [ AuthGuard ] },
        { path: 'pages/edit/:id', component: AdminPageFormComponent, canActivate: [ AuthGuard ] },
        { path: 'contacts', component: AdminContactListComponent, canActivate: [ AuthGuard ] }
    ]},

    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

export const ApplicationRoutes = RouterModule.forRoot(routes);