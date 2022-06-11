import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Club } from '../models/classes/Club';
import { Club_admin_externe } from '../models/classes/Club_admin_externe';
import { VariablesGlobales} from '../../sharedModule/Variables-Globales';
const ipMachine=VariablesGlobales.ipMachine
const CLUBS_API = 'http://'+ipMachine+':1000/SERVICE-CLUBS/';
const CULBS_API2 = 'http://'+ipMachine+':2007/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ClubsService {

  constructor(private http: HttpClient) { }
  getAllClubs(): Observable<any> {
    return this.http.get(CULBS_API2 + 'getAllClubs', httpOptions);
  }
  getClub(id:number): Observable<any> {
    return this.http.get(CULBS_API2 + 'getClubById/'+id, httpOptions);
  }
  updateClub(id:number,Club:Club):Observable<any> {
    return this.http.put(CULBS_API2 + 'updateClub/'+id,Club, httpOptions);
  }
  addClub(Club:Club): Observable<any> {
    return this.http.post<any>(CULBS_API2 + 'addClub',Club, httpOptions)
  }
  deleteClub(id:number): Observable<any>{
    return this.http.delete(CULBS_API2  + "deleteClub/"+id, httpOptions)
  }

  //------------ admin externe

  getAllClub_admin_externes(): Observable<any> {
    return this.http.get(CULBS_API2 + 'getAllClub_admin_externes', httpOptions);
  }
  getClub_admin_externe(id:number): Observable<any> {
    return this.http.get(CULBS_API2 + 'getClub_admin_externeById/'+id, httpOptions);
  }
  updateClub_admin_externe(id:number,Club_admin_externe:Club_admin_externe):Observable<any> {
    return this.http.put(CULBS_API2 + 'updateClub_admin_externe/'+id,Club_admin_externe, httpOptions);
  }
  addClub_admin_externe(Club_admin_externe:Club_admin_externe): Observable<any> {
    return this.http.post<any>(CULBS_API2 + 'addClub_admin_externe',Club_admin_externe, httpOptions)
  }
  deleteClub_admin_externe(id:number): Observable<any>{
    return this.http.delete(CULBS_API2  + "deleteClub_admin_externe/"+id, httpOptions)
  }
  


}