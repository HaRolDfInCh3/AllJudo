import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Champion } from '../models/classes/Champion';
import { Champion_admin_externe_palmares } from '../models/classes/Champion_admin_externe_palmares';


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
  getChampion(id:number): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getChampionById/'+id, httpOptions);
  }
  getChampionSimilaires(id:number): Observable<any> {
    return this.http.get(CHAMPIONS_API3 + 'get_Similars/'+id, httpOptions);
  }
  getChampionSimilaires_Deb_Fin(deb:number,fin:number): Observable<any> {
    return this.http.get(CHAMPIONS_API3 + 'get_Similars/'+deb+'/'+fin, httpOptions);
  }
  updateChampions(id:number,Champion:Champion):Observable<any> {
    return this.http.put(CHAMPIONS_API2 + 'updateChampion/'+id,Champion, httpOptions);
  }
  addChampion(Champion:Champion): Observable<any> {
    return this.http.post<any>(CHAMPIONS_API2 + 'addChampion',Champion, httpOptions)
  }
  delete(id:number): Observable<any>{
    return this.http.delete(CHAMPIONS_API2  + "deleteChampion/"+id, httpOptions)
  }
  getAllChampionsAdmin(): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getAllChampion_admin_externes', httpOptions);
  }
  getAllChampionsAdminDesc(): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getAllChampion_admin_externesDesc', httpOptions);
  }
  getChampionAdmin(id:number): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getChampion_admin_externeById/'+id, httpOptions);
  }
  getAllChampionsAdminPalmaresDesc(): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getAllChampion_admin_externe_palmaressDesc', httpOptions);
  }
  getAllChampionsAdminPalmares(): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getAllChampion_admin_externe_palmaress', httpOptions);
  }
  getChampionAdminPalmares(id:number): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getChampion_admin_externe_palmaresById/'+id, httpOptions);
  }
  deleteChampion_admin_externe_palmares(id:number): Observable<any>{
    return this.http.delete(CHAMPIONS_API2  + "deleteChampion_admin_externe_palmares/"+id, httpOptions)
  }
  addChampion_admin_externe_palmares(ChampionAEP:Champion_admin_externe_palmares): Observable<any> {
    return this.http.post<any>(CHAMPIONS_API2 + 'addChampion_admin_externe_palmares',ChampionAEP, httpOptions)
  }
  updateChampion_admin_externe_palmares(id:number,ChampionAEP:Champion_admin_externe_palmares): Observable<any> {
    return this.http.put<any>(CHAMPIONS_API2 + 'updateChampion_admin_externe_palmares/'+id,ChampionAEP, httpOptions)
  }


}