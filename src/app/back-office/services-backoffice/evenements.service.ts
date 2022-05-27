import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ Evenement } from '../models/classes/Evenement'; 
import { EvenementImportant } from '../models/classes/EvenementImportant';
import { EvenementImportantDirect } from '../models/classes/EvenementImportantDirect';
const EVENEMENTS_API = 'http://localhost:1000/SERVICE-EVENEMENTS/';
const EVENEMENTS_API2 = 'http://localhost:2004/';
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
  getEventResults(id:number): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getAllEvresultatsByEventId/'+id, httpOptions);
  }
  getChampionResults(id:number): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getAllEvresultatsByChampionId/'+id, httpOptions);
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
    return this.http.get(EVENEMENTS_API2 + 'getNextEventsByCategorieAndAge/'+age+'/'+categorie+'/'+date_deb, httpOptions);
  }
  getNextEventsByTrimester(date_deb:Date): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getNextEventsByTrimester/'+date_deb.getMonth()+'/'+date_deb.getFullYear(), httpOptions);
  }
  
  //uploadResults()
  
}
