import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ News } from '../models/classes/News'; 
const NEWS_API = 'http://localhost:1000/SERVICE-NEWS/';
const NEWS_API2 = 'http://localhost:2003/';
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
  getNews(id:number): Observable<any> {
    return this.http.get(NEWS_API2 + 'getNewsById/'+id, httpOptions);
  }
  updateNews(id:number,news:News):Observable<any> {
    return this.http.put(NEWS_API2 + 'updateNews/'+id,news, httpOptions);
  }
  addNews(news:News): Observable<any> {
    return this.http.post<any>(NEWS_API2 + 'addNews',news, httpOptions)
  }
  delete(id:number): Observable<any>{
    return this.http.delete(NEWS_API2  + "deleteNews/"+id, httpOptions)
  }

}
