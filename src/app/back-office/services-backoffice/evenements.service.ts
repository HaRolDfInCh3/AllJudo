import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import {filter, shareReplay,switchMap,  } from 'rxjs/operators';
import { timer } from 'rxjs';
import { Observable } from 'rxjs';
import{ Evenement } from '../models/classes/Evenement'; 
import { EvenementImportant } from '../models/classes/EvenementImportant';
import { EvenementImportantDirect } from '../models/classes/EvenementImportantDirect';
import { VariablesGlobales} from '../../sharedModule/Variables-Globales';

const ipMachine=VariablesGlobales.ipMachine
//const EVENEMENTS_API = 'http://'+ipMachine+':1000/SERVICE-EVENEMENTS/';
const temps_raffraichissement=VariablesGlobales.raffraichissement_cache
//const EVENEMENTS_API2 = 'http://'+ipMachine+':2004/';
const EVENEMENTS_API = 'http://'+ipMachine+':1000/SERVICE-EVENEMENTS/';
const EVENEMENTS_API2 = 'http://'+ipMachine+':2004/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EvenementsService {

  constructor(private http: HttpClient) { }

  getEvenement(id:number): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getEvenementById/'+id, httpOptions);
  }
  getAllEvenements(): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getAllEvenements', httpOptions);
  }
  getAllEvenementsDesc(): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getAllEvenementsDesc', httpOptions);
  }
  private allEvenementsByDateDescRequest$?: Observable<any> ;
  getAllEvenementsByDateDesc(refresh?:boolean): Observable<any> {
    if (!this.allEvenementsByDateDescRequest$ || refresh) {
      const timer$ = timer(0, temps_raffraichissement);

     //For each tick make an http request to fetch new data
      
      this.allEvenementsByDateDescRequest$ = timer$.pipe(
        switchMap(_ => this.http.get(EVENEMENTS_API2 + 'getAllEvenementsByDateDesc', httpOptions)),
        shareReplay(1)
      );
      
      
    }

    return this.allEvenementsByDateDescRequest$;
    //return this.http.get(EVENEMENTS_API2 + 'getAllEvenementsByDateDesc', httpOptions);
  }
  getEventResults(id:number): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getAllEvresultatsByEventId/'+id, httpOptions);
  }
  getChampionResults(id:number): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getAllEvresultatsByChampionId/'+id, httpOptions);
  }
  getChampionResultsByYear(id:number): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getAllEvresultatsByChampionIdDesc/'+id, httpOptions);
  }
  addEvenement(evenement:Evenement): Observable<any> {
    return this.http.post<any>(EVENEMENTS_API2 + 'addEvenement',evenement, httpOptions)
  }
  updateEvenement(id:number,evenement:Evenement):Observable<any> {
    return this.http.put(EVENEMENTS_API2 + 'updateEvenement/'+id,evenement, httpOptions);
  }
  delete(id:number): Observable<any>{
    return this.http.delete(EVENEMENTS_API2  + "deleteEvenement/"+id, httpOptions)
  }
  getEvenementImportant(id:number): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getEvenementImportantById/'+id, httpOptions);
  }
  getAllEvenementImportants(): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getAllEvenementImportants', httpOptions);
  }
  getAllEvenementImportantsDesc(): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getAllEvenementImportantsDesc', httpOptions);
  }
  addEvenementImportant(evenement:EvenementImportant): Observable<any> {
    return this.http.post<any>(EVENEMENTS_API2 + 'addEvenementImportant',evenement, httpOptions)
  }
  updateEvenementImportant(id:number,evenement:EvenementImportant):Observable<any> {
    return this.http.put(EVENEMENTS_API2 + 'updateEvenementImportant/'+id,evenement, httpOptions);
  }
  deleteEvenementImportant(id:number): Observable<any>{
    return this.http.delete(EVENEMENTS_API2  + "deleteEvenementImportant/"+id, httpOptions)
  }
  getEvenementImportantDirect(id:number): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getEvenementImportantDirectById/'+id, httpOptions);
  }
  getAllEvenementImportantDirects(): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getAllEvenementImportantDirects', httpOptions);
  }
  getAllEvenementImportantDirectsDesc(): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getAllEvenementImportantDirectsDesc', httpOptions);
  }
  addEvenementImportantDirect(evenement:EvenementImportantDirect): Observable<any> {
    return this.http.post<any>(EVENEMENTS_API2 + 'addEvenementImportantDirect',evenement, httpOptions)
  }
  updateEvenementImportantDirect(id:number,evenement:EvenementImportantDirect):Observable<any> {
    return this.http.put(EVENEMENTS_API2 + 'updateEvenementImportantDirect/'+id,evenement, httpOptions);
  }
  deleteEvenementImportantDirect(id:number): Observable<any>{
    return this.http.delete(EVENEMENTS_API2  + "deleteEvenementImportantDirect/"+id, httpOptions)
  }
  deleteEvenement(id:number): Observable<any>{
    return this.http.delete(EVENEMENTS_API2  + "deleteEvenement/"+id, httpOptions)
  }
  getNextEventsByCategorieAndAge(age:number,categorie:number,date_deb:Date): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getNextEventsByCategorieAndAge/'+age+'/'+categorie+'/'+date_deb.getMonth()+'/'+date_deb.getFullYear(), httpOptions);
  }
  getNextEventsByTrimester(date_deb:Date): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getNextEventsByTrimester/'+date_deb.getMonth()+'/'+date_deb.getFullYear(), httpOptions);
  }
  getPalmaresById(id:number): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getPalmaresById/'+id, httpOptions);
  }
  getclassementChampionsParEvenementID(id:number): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getclassementChampionsParEvenementID/'+id, httpOptions);
  }
  getclassementChampionsParClubAndEvenementID(id:number): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getclassementChampionsParClubAndEvenementID/'+id, httpOptions);
  }
  //getclassementChampionsParClubAndEvenementID
  getClassementPaysParEvenementID(id:number): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getClassementPaysParEvenementID/'+id, httpOptions);
  }
  getClassementClubParEvenementID(id:number): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getClassementClubParEvenementID/'+id, httpOptions);
  }
  getClassementPaysParEvenementIDetParSexe(id:number,sexe:string): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getClassementPaysParEvenementIDetParSexe/'+id+'/'+sexe, httpOptions);
  }
  getResultatsAnciens(annee:number): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getResultatsAnciens/'+annee, httpOptions);
  }
  getEvents_ByCategorie_ByAge_ByDate(cat_id:number,age_id:number,nom:string): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'findEvents_ByCategorie_ByAge_ByDate/'+cat_id+'/'+age_id+'/'+nom, httpOptions);
  }
  getEventsByCategorieAndAgeAndDate(cat_id:number,age_id:number,nom:string): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'findEventsByCategorieAndAgeAndDate/'+cat_id+'/'+age_id+'/'+nom, httpOptions);
  }
  getEventsByMotCle_In_Categorie_Age_Nom(motcle:string): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getEventsByMotCle_In_Categorie_Age_Nom/'+motcle, httpOptions);
  }
 
  uploadResults(eventid:number,formData:FormData): Observable<any> {
    const req = new HttpRequest('POST', 'http://localhost:2004/addResults/'+eventid, formData, {
      // reportProgress: true
    });
    return this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      

  }
  
}
