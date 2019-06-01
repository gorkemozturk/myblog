import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {
  users: any = [];

  constructor(http: HttpClient, private httpClient: HttpClient) {
    super(environment.url + '/users', http);
  }

  getUsers() {
    return this.httpClient.get(environment.url + '/users').subscribe(response => this.users = response);
  }
}
