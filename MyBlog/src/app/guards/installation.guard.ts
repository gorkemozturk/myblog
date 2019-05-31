import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class InstallationGuard implements CanActivate {
  users: any = [];

  constructor(private router: Router, private userService: UsersService) { 
    this.users = this.userService.getResources();
  }

  canActivate(): boolean {
    if (this.users) {
      this.router.navigateByUrl('/');
      return false;
    }

    return true;
  }
  
}
