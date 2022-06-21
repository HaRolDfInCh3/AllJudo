import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {shareReplay } from 'rxjs/operators';
import { VariablesGlobales} from '../../sharedModule/Variables-Globales';
import { Observable } from 'rxjs';
const ipMachine=VariablesGlobales.ipMachine
const LECTURE_API = 'http://'+ipMachine+':1000/SERVICE-LECTURE/';
const LECTURE_API2 = 'http://'+ipMachine+':2005/';
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
  private banniere_par_taille$?: Observable<any> ;
  getRandomBanniere_par_taille(taille:string,refresh?:boolean): Observable<any> {
    if (!this.banniere_par_taille$ || refresh) {
      this.banniere_par_taille$ = this.http.get(LECTURE_API2+ 'getRandomBanniere_par_taille/'+taille, httpOptions).pipe(
        shareReplay(1)
      );
    }

    return this.banniere_par_taille$;
   // return this.http.get(LECTURE_API2+ 'getRandomBanniere_par_taille/'+taille, httpOptions);
  }
}
