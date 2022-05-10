import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const NEWS_API = 'http://localhost:1000/SERVICE-NEWS/';
const NEWS_API2 = 'http://localhost:1004/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getAllNews(): Observable<any> {
    return this.http.get(NEWS_API2 + 'getAllNewss', httpOptions);
  }
}
