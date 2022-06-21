import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {shareReplay,switchMap,  } from 'rxjs/operators';
import { timer } from 'rxjs';
import { Champion } from '../models/classes/Champion';
import { Champion_admin_externe_palmares } from '../models/classes/Champion_admin_externe_palmares';
import { VariablesGlobales} from '../../sharedModule/Variables-Globales';
import { Champion_admin_externe } from 'src/app/user-view/Models/classes/Champion_admin_externe';
const ipMachine=VariablesGlobales.ipMachine
const temps_raffraichissement=VariablesGlobales.raffraichissement_cache
const CHAMPIONS_API = 'http://'+ipMachine+':1000/SERVICE-CHAMPIONS/';
const CHAMPIONS_API2 = 'http://'+ipMachine+':2006/';
const CHAMPIONS_API3 = 'http://'+ipMachine+':2000/';
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
  private allChampionByNameStartRequest$?: Observable<any> ;
  getAllChampionsByNameStartAsc(premiereLettre:String,refresh?:boolean): Observable<any> {
    if (!this.allChampionByNameStartRequest$ || refresh) {
      const timer$ = timer(0, temps_raffraichissement);

     //For each tick make an http request to fetch new data
      
      this.allChampionByNameStartRequest$ = timer$.pipe(
        switchMap(_ => this.http.get(CHAMPIONS_API2 + 'getAllChampionsByNameStart/'+premiereLettre, httpOptions)),
        shareReplay(1)
      );
      
      
    }

    return this.allChampionByNameStartRequest$;
    //return this.http.get(CHAMPIONS_API2 + 'getAllChampionsByNameStart/'+premiereLettre, httpOptions);
  }
  getAllChampions(): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getAllChampions', httpOptions);
  }
  getAllChampionsByName(nom:string): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getAllChampionsByName/'+nom, httpOptions);
  }
  getAnniversaires(): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getAnniversaires', httpOptions);
  }
  getLastchampions(): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getLatestChampions', httpOptions);
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
  getAllChampionsAdminDateModifDesc(): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getAllChampion_admin_externesDateModifDesc', httpOptions);
  }
  getAllChampionsAdminDesc(): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getAllChampion_admin_externesDesc', httpOptions);
  }
  getAllFans(id:number): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getAllFans/'+id, httpOptions);
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
  addChampion_admin_externe(ChampionAEP:Champion_admin_externe): Observable<any> {
    return this.http.post<any>(CHAMPIONS_API2 + 'addChampion_admin_externe',ChampionAEP, httpOptions)
  }
  updateChampion_admin_externe(id:number,ChampionAEP:Champion_admin_externe): Observable<any> {
    return this.http.put<any>(CHAMPIONS_API2 + 'updateChampion_admin_externe/'+id,ChampionAEP, httpOptions)
  }
  getActifsChampion_admin_externeByUserId(id:number): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getActifsChampion_admin_externeByUserId/'+id, httpOptions);
  }
  getNonActifsChampion_admin_externeByUserId(id:number): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getNonActifsChampion_admin_externeByUserId/'+id, httpOptions);
  }
  getChampionModifiablesParUserID(id:number): Observable<any> {
    return this.http.get(CHAMPIONS_API2 + 'getChampionModifiablesParUserID/'+id, httpOptions);
  }
//getAllChampion_admin_externeByUserId/{id}

}