import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  getAllEvenements(): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getAllEvenements', httpOptions);
  }
  getAllCategorieEvenements(): Observable<any> {
    return this.http.get(EVENEMENTS_API2 + 'getAllEvcategorieevenements', httpOptions);
  }
}
