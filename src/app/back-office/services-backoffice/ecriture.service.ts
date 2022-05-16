import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Technique } from '../models/classes/Technique';
import { Sous_categorie } from '../models/classes/Sous_categorie';
import { Galerie } from '../models/classes/Galerie';
import { Article } from '../models/classes/Article';
import { Annonce } from '../models/classes/Annonce';
import { Bannieres_par_taille } from '../models/classes/Bannieres_par_taille';
import { Categorie } from '../models/classes/Categorie';
import { Video } from '../models/classes/Video';
const ECRITURE_API = 'http://localhost:1000/SERVICE-ECRITURE/';
const ECRITURE_API2 = 'http://localhost:2008/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EcritureService {

  constructor(private http: HttpClient) { }

  addTechnique(t:Technique): Observable<any>{
    return this.http.post<any>(ECRITURE_API2 + 'addTechnique',t, httpOptions)
  }
  addSousCategorie(s:Sous_categorie): Observable<any>{
    return this.http.post<any>(ECRITURE_API2 + 'addSous_categorie',s, httpOptions)
  }
  addGalerie(g:Galerie): Observable<any>{
    return this.http.post<any>(ECRITURE_API2 + 'addGalerie',g, httpOptions)
  }
  addVideo(g:Video): Observable<any>{
    return this.http.post<any>(ECRITURE_API2 + 'addVideo',g, httpOptions)
  }
  updateVideo(id:number,g:Video): Observable<any>{
    return this.http.put<any>(ECRITURE_API2 + 'updateVideo/'+id,g, httpOptions)
  }
  addArticle(a:Article): Observable<any>{
    return this.http.post<any>(ECRITURE_API2 + 'addArticle',a, httpOptions)
  }
  addBannieres_par_taille(b:Bannieres_par_taille): Observable<any>{
    return this.http.post<any>(ECRITURE_API2 + 'addBannieres_par_taille',b, httpOptions)
  }
  updateGalerie(id:number,g:Galerie): Observable<any>{
    return this.http.put<any>(ECRITURE_API2 + 'updateGalerie/'+id,g, httpOptions)
  }
  AddAnnonce(a:Annonce): Observable<any>{
    return this.http.post<any>(ECRITURE_API2 + 'addAnnonce',a, httpOptions)
  }
  AddCategorie(c:Categorie): Observable<any>{
    return this.http.post<any>(ECRITURE_API2 + 'addCategorie',c, httpOptions)
  }
  deleteGalerie(id:number): Observable<any>{
    return this.http.delete(ECRITURE_API2  + "deleteGalerie/"+id, httpOptions)
  }
  deleteVideo(id:number): Observable<any>{
    return this.http.delete(ECRITURE_API2  + "deleteVideo/"+id, httpOptions)
  }

}

