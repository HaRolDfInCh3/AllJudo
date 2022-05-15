import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ News } from '../models/classes/News'; 
const PROVIDER_API = 'http://localhost:1000/SERVICE-PROVIDER/';
const PROVIDER_API2 = 'http://localhost:2005/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }


  getAllNewsCategories(): Observable<any> {
    return this.http.get(PROVIDER_API2 + 'getAllNewscategories', httpOptions);
  }
  getAllEvCategoriesEvenement(): Observable<any> {
    return this.http.get(PROVIDER_API2 + 'getAllEvcategorieevenements', httpOptions);
  }
  getAllpays(): Observable<any> {
    return this.http.get(PROVIDER_API2 + 'getAllPays', httpOptions);
  }
  getAllEvCategoriesAge(): Observable<any> {
    return this.http.get(PROVIDER_API2 + 'getAllEvcategorieages', httpOptions);
  }
  getAllClubs(): Observable<any> {
    return this.http.get(PROVIDER_API2 + 'getAllClubs', httpOptions);
  }

}

