import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  url = 'https://api.github.com/users';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {

    return this.http.get(this.url);
  }
}
