import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService extends BaseService {
  
  constructor(http: HttpClient, private httpClient: HttpClient) {
    super(environment.url + '/tags', http);
  }

  getTagUsage(id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(environment.url + '/tags/' + id + '/usage');
  }
}
