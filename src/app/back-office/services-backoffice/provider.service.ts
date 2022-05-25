import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const LECTURE_API = 'http://localhost:1000/SERVICE-LECTURE/';
const LECTURE_API2 = 'http://localhost:2005/';
const liensimages="https://www.alljudo.net/images/flags/"
const liensnews2022="https://www.alljudo.net/images/news/"
const lienspubs="https://www.alljudo.net/images/pubs/"
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }
  getLiensDrapeaux():string{
    return liensimages
  }
  getLiensPubs(){
    return lienspubs;
  }
  getLiensNews2022():string{
    return liensnews2022
  }
  getAllGrades(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllGrades', httpOptions);
  }
  getAllAnnoncesDesc(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllAnnoncesDesc', httpOptions);
  }
  getAllAnnonces(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllAnnonces', httpOptions);
  }
  getAnnonce(id:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAnnonceById/'+id, httpOptions);
  }
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
  getTechnique(id:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getTechniqueById/'+id, httpOptions);
  }
  getAllVideos(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllVideos', httpOptions);
  }
  getVideo(id:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getVideoById/'+id, httpOptions);
  }
  getLastCommentaires(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getLastCommentaires', httpOptions);
  }
  getAllCommentsByUserId(id:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllCommentsByUserId/'+id, httpOptions);
  }
  getAllCommentsByNewsId(id:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllCommentsByNewsId/'+id, httpOptions);
  }
  getAllCommentsByUserIdAndNewsId(userid:number,newsid:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllCommentsByUserIdAndNewsId/'+userid+"/"+newsid, httpOptions);
  }
  getAllLastCommentaires(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllLastCommentaires', httpOptions);
  }
  getAllArticles(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllArticles', httpOptions);
  }
  getArticle(id:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getArticleById/'+id, httpOptions);
  }
  getAllBannieres_par_tailles(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllBannieres_par_tailles', httpOptions);
  }
  getBannieres_par_taille(id:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getBannieres_par_tailleById/'+id, httpOptions);
  }
  getPari(idPari:number): Observable<any>{
    return this.http.get(LECTURE_API2 + 'getPariById/'+idPari, httpOptions);
  }
  getAllParis(): Observable<any>{
    return this.http.get(LECTURE_API2 + 'getAllParis', httpOptions);
  }
  getPariCompositions(idPari:number): Observable<any>{
    return this.http.get(LECTURE_API2 + 'getPari_compositionByIdPari/'+idPari, httpOptions);
  }
  getPariCompositionsDesc(idPari:number): Observable<any>{
    return this.http.get(LECTURE_API2 + 'getPari_compositionByIdPariAsc/'+idPari, httpOptions);
  }
  getParisUser(idPariComposition:number): Observable<any>{
    return this.http.get(LECTURE_API2 + 'getAllPari_usersByPari_Composition/'+idPariComposition, httpOptions);
  }
  getPariResultat(idPari:number): Observable<any>{
    return this.http.get(LECTURE_API2 + 'getPari_resultatsByPari_id/'+idPari, httpOptions);
  }
  getAllCategories(): Observable<any>{
    return this.http.get(LECTURE_API2 + 'getAllCategories', httpOptions);
  }
  getAllSous_categories(): Observable<any>{
    return this.http.get(LECTURE_API2 + 'getAllSous_categories', httpOptions);
  }
  getAllParametresBatchs(): Observable<any>{
    return this.http.get(LECTURE_API2 + 'getAllParametresBatchs', httpOptions);
  }
  getLastEvents(): Observable<any>{
    return this.http.get(LECTURE_API2 + 'getLastEvenements', httpOptions);
  }
  getNextEvents(): Observable<any>{
    return this.http.get(LECTURE_API2 + 'getNextEvenements', httpOptions);
  }
  getNextEventsDesc(): Observable<any>{
    return this.http.get(LECTURE_API2 + 'getNextEvenementsDesc', httpOptions);
  }
  

}

