import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {shareReplay,switchMap,  } from 'rxjs/operators';
import { timer } from 'rxjs';
import { Observable } from 'rxjs';
import{ News } from '../models/classes/News'; 
import { VariablesGlobales} from '../../sharedModule/Variables-Globales';
const ipMachine=VariablesGlobales.ipMachine
//const NEWS_API = 'http://'+ipMachine+':1000/SERVICE-NEWS/';
const temps_raffraichissement=VariablesGlobales.raffraichissement_cache
//const NEWS_API2 = 'http://'+ipMachine+':2003/';
const NEWS_API = 'http://'+ipMachine+':1000/SERVICE-NEWS/';

const NEWS_API2 = 'http://'+ipMachine+':2003/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }
  //getNewsByCategorieAndChapo/{categorie}/{chapo}
  getNewsByCategorieAndChapo(chapo:string,categorie:string): Observable<any> {
    return this.http.get(NEWS_API2 + 'getNewsByCategorieAndChapo/'+categorie+"/"+chapo, httpOptions);
  }
  private allnewsRequest$?: Observable<any> ;
  getAllNewsByDateDesc(refresh?:boolean): Observable<any> {
    if (!this.allnewsRequest$ || refresh) {
      const timer$ = timer(0, temps_raffraichissement);
//For each tick make an http request to fetch new data
      this.allnewsRequest$ = timer$.pipe(
        switchMap(_ => this.http.get(NEWS_API2 + 'getAllNewsByDateDesc', httpOptions)),
        shareReplay(1)
      );
    }

    return this.allnewsRequest$;
    //return this.http.get(NEWS_API2 + 'getAllNewsByDateDesc', httpOptions);
  }
   getAllNews(): Observable<any> {
    return this.http.get(NEWS_API2 + 'getAllNewss', httpOptions);
  }
  getLatestNews(): Observable<any> {
    return this.http.get(NEWS_API2 + 'getLatestNews', httpOptions);
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
  getLatestNewsAladeux(id:number): Observable<any>{
    return this.http.get(NEWS_API2 + 'getLatestNewsAladeux/'+id, httpOptions);
  }
  getLatestNewsAlaUne(id:number): Observable<any>{
    return this.http.get(NEWS_API2 + 'getLatestNewsAlaUne/'+id, httpOptions);
  }
  getBrevesNews(): Observable<any> {
    return this.http.get(NEWS_API2 + 'getBrevesNews', httpOptions);
  }
  getNewsByCategorieAndType(id:number,cat:string,type:string): Observable<any> {
    return this.http.get(NEWS_API2 + 'getNewsByCategorieAndType/'+cat+'/'+type+"/"+id, httpOptions);
  }
  getAllPhotosByNewsId(id:number): Observable<any> {
    return this.http.get(NEWS_API2 + 'getAllPhotosByNewsId/'+id, httpOptions);
  }

}
