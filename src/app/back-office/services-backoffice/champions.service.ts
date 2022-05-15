import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Champion } from '../models/classes/Champion';


const CHAMPIONS_API = 'http://localhost:1000/SERVICE-CHAMPIONS/';
const CHAMPIONS_API2 = 'http://localhost:2006/';
const CHAMPIONS_API3 = 'http://localhost:2000/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ChampionsService {

  constructor(private http: HttpClient) { }
  getAllChampionsByNameStart(premiereLettre:String): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getAllChampionsByNameStart/'+premiereLettre, httpOptions);
  }
  getAllChampions(): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getAllChampions', httpOptions);
  }
  getChampions(id:number): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getChampionById/'+id, httpOptions);
  }
  getChampionSimilaires(id:number): Observable<any> {
    return this.http.get(CHAMPIONS_API3 + 'get_Similars/'+id, httpOptions);
  }
  updateChampions(id:number,Champion:Champion):Observable<any> {
    return this.http.put(CHAMPIONS_API2 + 'updateChampion/'+id,Champion, httpOptions);
  }
  addChampions(Champion:Champion): Observable<any> {
    return this.http.post<any>(CHAMPIONS_API2 + 'addChampion',Champion, httpOptions)
  }
  delete(id:number): Observable<any>{
    return this.http.delete(CHAMPIONS_API2  + "deleteChampion/"+id, httpOptions)
  }

}