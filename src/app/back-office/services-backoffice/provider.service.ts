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
export class ProviderService {

  constructor(private http: HttpClient) { }


  getAllNewsCategories(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllNewscategories', httpOptions);
  }
  getAllEvCategoriesEvenement(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllEvcategorieevenements', httpOptions);
  }
  getAllpays(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllPays', httpOptions);
  }
  getAllEvCategoriesAge(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllEvcategorieages', httpOptions);
  }
  getAllClubs(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllClubs', httpOptions);
  }
  getAllImages(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllImages', httpOptions);
  }
  getAllImagesDesc(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllImagesDesc', httpOptions);
  }
  getAllDepartements(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllDepartements', httpOptions);
  }
  getAllRegions(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllRegions', httpOptions);
  }
  getAllEvenements(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllEvenements', httpOptions);
  }
  getAllGaleries(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllGaleries', httpOptions);
  }
  getGalerie(id:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getGalerieById/'+id, httpOptions);
  }
  getAllInvalidesEvenements(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllInvalidesEvenements', httpOptions);
  }
  getAllTechniques(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllTechniques', httpOptions);
  }
  getAllVideos(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllVideos', httpOptions);
  }
  getVideo(id:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getVideoById/'+id, httpOptions);
  }

}

