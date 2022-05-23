import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const LECTURE_API = 'http://localhost:1000/SERVICE-LECTURE/';
const LECTURE_API2 = 'http://localhost:2005/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PublicitesService {

  constructor(private http: HttpClient) { }

  getAllBannieres_par_tailles(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllBannieres_par_tailles', httpOptions);
  }
  getBannieres_par_id(id:number): Observable<any> {
    return this.http.get(LECTURE_API2+ 'getBannieres_par_tailleById/'+id, httpOptions);
  }
  getBannieres_par_taille(taille:string): Observable<any> {
    return this.http.get(LECTURE_API2+ 'getBannieres_par_taille/'+taille, httpOptions);
  }
  getRandomBanniere_par_taille(taille:string): Observable<any> {
    return this.http.get(LECTURE_API2+ 'getRandomBanniere_par_taille/'+taille, httpOptions);
  }
}
