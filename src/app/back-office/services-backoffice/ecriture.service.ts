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
import { Pari } from '../models/classes/Pari';
import { Pari_composition } from '../models/classes/Pari_composition';
import { Pari_resultat } from '../models/classes/Pari_resultat';
import { Pari_user } from '../models/classes/Pari_user';
import { Pari_compositionElement } from '../models/classes/Pari_compositionElement';
import { ParametresBatch } from '../models/classes/ParametresBatch';
import { Commentaire } from 'src/app/user-view/Models/classes/Commentaire';
import { VariablesGlobales} from '../../sharedModule/Variables-Globales';
const ipMachine=VariablesGlobales.ipMachine
const ECRITURE_API = 'http://'+ipMachine+':1000/SERVICE-ECRITURE/';
const ECRITURE_API2 = 'http://'+ipMachine+':2008/';
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
  deleteTechnique(id:number): Observable<any>{
    return this.http.delete(ECRITURE_API2  + "deleteTechnique/"+id, httpOptions)
  }
  updateTechnique(id:number,g:Technique): Observable<any>{
    return this.http.put<any>(ECRITURE_API2 + 'updateTechnique/'+id,g, httpOptions)
  }
  AddArticle(a:Article): Observable<any>{
    return this.http.post<any>(ECRITURE_API2 + 'addArticle',a, httpOptions)
  }
  deleteArticle(id:number): Observable<any>{
    return this.http.delete(ECRITURE_API2  + "deleteArticle/"+id, httpOptions)
  }
  updateArticle(id:number,g:Article): Observable<any>{
    return this.http.put<any>(ECRITURE_API2 + 'updateArticle/'+id,g, httpOptions)
  }
  updateBannieres_par_taille(id:number,g:Bannieres_par_taille): Observable<any>{
    return this.http.put<any>(ECRITURE_API2 + 'updateBannieres_par_taille/'+id,g, httpOptions)
  }
  deleteBannieres_par_taille(id:number): Observable<any>{
    return this.http.delete(ECRITURE_API2  + "deleteBannieres_par_taille/"+id, httpOptions)
  }
 addPari(p:Pari){
    return this.http.post<any>(ECRITURE_API2 + 'addPari',p, httpOptions)
  }
  updatePari(id:number,g:Pari): Observable<any>{
    return this.http.put<any>(ECRITURE_API2 + 'updatePari/'+id,g, httpOptions)
  }
  deletePari(id:number): Observable<any>{
    return this.http.delete(ECRITURE_API2  + "deletePari/"+id, httpOptions)
  }
  addPari_composition(p:Pari_composition){
    return this.http.post<any>(ECRITURE_API2 + 'addPari_composition',p, httpOptions)
  }
  updatePari_composition(id:number,g:Pari_composition): Observable<any>{
    return this.http.put<any>(ECRITURE_API2 + 'updatePari_composition/'+id,g, httpOptions)
  }
  deletePari_composition(id:number): Observable<any>{
    return this.http.delete(ECRITURE_API2  + "deletePari_composition/"+id, httpOptions)
  }
  addPari_resultat(p:Pari_resultat){
    return this.http.post<any>(ECRITURE_API2 + 'addPari_resultat',p, httpOptions)
  }
  updatePari_resultat(id:number,g:Pari_resultat): Observable<any>{
    return this.http.put<any>(ECRITURE_API2 + 'updatePari_resultat/'+id,g, httpOptions)
  }
  deletePari_resultat(id:number): Observable<any>{
    return this.http.delete(ECRITURE_API2  + "deletePari_resultat/"+id, httpOptions)
  }
  addPari_user(p:Pari_user){
    return this.http.post<any>(ECRITURE_API2 + 'addPari_user',p, httpOptions)
  }
  updatePari_user(id:number,g:Pari_user): Observable<any>{
    return this.http.put<any>(ECRITURE_API2 + 'updatePari_user/'+id,g, httpOptions)
  }
  deletePari_user(id:number): Observable<any>{
    return this.http.delete(ECRITURE_API2  + "deletePari_user/"+id, httpOptions)
  }
  addPari_compositionElement(p:Pari_compositionElement){
    return this.http.post<any>(ECRITURE_API2 + 'addPari_compositionElement',p, httpOptions)
  }
  addAnnonce(p:Annonce){
    return this.http.post<any>(ECRITURE_API2 + 'addAnnonce',p, httpOptions)
  }
  updateAnnonce(id:number,g:Annonce): Observable<any>{
    return this.http.put<any>(ECRITURE_API2 + 'updateAnnonce/'+id,g, httpOptions)
  }
  deleteAnnonce(id:number): Observable<any>{
    return this.http.delete(ECRITURE_API2  + "deleteAnnonce/"+id, httpOptions)
  }
  deleteCategorie(id:number): Observable<any>{
    return this.http.delete(ECRITURE_API2  + "deleteCategorie/"+id, httpOptions)
  }
  deleteSous_categorie(id:number): Observable<any>{
    return this.http.delete(ECRITURE_API2  + "deleteSous_categorie/"+id, httpOptions)
  }
  addParametresBatch(p:ParametresBatch){
    return this.http.post<any>(ECRITURE_API2 + 'addParametresBatch',p, httpOptions)
  }
  deleteParametresBatch(id:number): Observable<any>{
    return this.http.delete(ECRITURE_API2  + "deleteParametresBatch/"+id, httpOptions)
  }
  addCommentaire(c:Commentaire){
    return this.http.post<any>(ECRITURE_API2 + 'addCommentaire',c, httpOptions)
  }

}

