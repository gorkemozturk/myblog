import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/default/home/home.component';
import { DefaultComponent } from './layouts/default/default.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';

const routes: Routes = [
    // Dedault Routes
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: DefaultComponent, children: [ { path: '', component: HomeComponent } ] },
    
    // Auth Routes
    { path: 'login', component: AuthComponent, children: [ { path: '', component: LoginComponent } ] },

    // Admin Routes
];

export const ApplicationRoutes = RouterModule.forRoot(routes);