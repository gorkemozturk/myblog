import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService {
  
  constructor(http: HttpClient, private httpClient: HttpClient) {
    super(environment.url + '/posts', http);
  }

  getPostsByTag(id: any): Observable<any> {
    return this.httpClient.get<any>(environment.url + '/posts/tag/' + id);
  }
}
