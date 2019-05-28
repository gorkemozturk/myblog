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

const routes: Routes = [
    // Default Routes
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '', component: DefaultComponent, children: [ { path: 'home', component: HomeComponent } ] },
    { path: '', component: DefaultComponent, children: [ { path: 'post/:id/:slug', component: PostComponent } ] },
    
    // Auth Routes
    { path: '', component: AuthComponent, children: [ { path: 'login', component: LoginComponent } ] },
    { path: '', component: AuthComponent, children: [ { path: 'install', component: InstallComponent } ] },

    // Admin Routes
    { path: 'admin', redirectTo: '/admin/dashboard', pathMatch: 'full' },
    { path: 'admin', component: AdminComponent, children: [ { path: 'dashboard', component: AdminDashboardComponent } ] },
    { path: 'admin', component: AdminComponent, children: [ { path: 'posts', component: AdminPostListComponent } ] },
    { path: 'admin', component: AdminComponent, children: [ { path: 'posts/new', component: AdminPostFormComponent } ] },
    { path: 'admin', component: AdminComponent, children: [ { path: 'posts/edit/:id', component: AdminPostFormComponent } ] }
];

export const ApplicationRoutes = RouterModule.forRoot(routes);