import { Injectable } from '@angular/core';
import {shareReplay,switchMap,  } from 'rxjs/operators';
import { timer } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VariablesGlobales} from '../../sharedModule/Variables-Globales';
const ipMachine=VariablesGlobales.ipMachine
const hote=VariablesGlobales.hoteDonnees
const temps_raffraichissement=VariablesGlobales.raffraichissement_cache
const LECTURE_API = 'http://'+ipMachine+':1000/SERVICE-LECTURE/';
const LECTURE_API2 = 'http://'+ipMachine+':2005/';
const PYTHONAPIVIDEOS = 'http://'+ipMachine+':5000/';
const lienspdfs=hote+"/PDF_frame-"
const liensimagesDrapeaux=hote+"/images/flags/"
const liensnews2022=hote+"/images/news/"
const liensImagesGaleries=hote+"/images/galeries/"
const lienspubs=hote+"/images/pubs/"
const medaillesLiens=hote+"/images/pictos/"
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }
  getLiensDrapeaux():string{
    return liensimagesDrapeaux
  }
  getMedaillesLiens(){
  return medaillesLiens
}  getLiensPdfs():string{
    return lienspdfs;
  }
  getLiensGalerie():string{
    return liensImagesGaleries
  }
  getLiensPubs(){
    return lienspubs;
  }
  getLiensNews2022():string{
    return liensnews2022
  }
  private videosRecherches$?: Observable<any> ;
  getYoutubeVideosByKeyword(keyword:string,refresh?:boolean): Observable<any> {
    if (!this.videosRecherches$ || refresh) {
      this.videosRecherches$ = this.http.get(PYTHONAPIVIDEOS + 'getVideosByKeyword/'+keyword, httpOptions).pipe(
        shareReplay(1)
      );
    }
    
    return this.videosRecherches$;
    //return this.http.get(LECTURE_API2 + 'getAllNewscategories', httpOptions);
  }
  getYoutubeVideoById(id:string): Observable<any> {
    return this.http.get(PYTHONAPIVIDEOS + 'getVideoDetailsById/'+id, httpOptions);
  }
  getYoutubeChannelsByKeyword(id:string): Observable<any> {
    return this.http.get(PYTHONAPIVIDEOS + 'getChannelsByKeyword/'+id, httpOptions);
  }
  getAllGrades(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllGrades', httpOptions);
  }
  getAllAnnoncesDesc(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllAnnoncesDesc', httpOptions);
  }
  getAllEventsYears(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllEventsYears', httpOptions);
  }
  
  getAllAnnonces(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllAnnonces', httpOptions);
  }
  getAnnonce(id:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAnnonceById/'+id, httpOptions);
  }
  private allNewsCategoriesRequest$?: Observable<any> ;
  getAllNewsCategories(refresh?:boolean): Observable<any> {
    if (!this.allNewsCategoriesRequest$ || refresh) {
      this.allNewsCategoriesRequest$ = this.http.get(LECTURE_API2 + 'getAllNewscategories', httpOptions).pipe(
        shareReplay(1)
      );
    }

    return this.allNewsCategoriesRequest$;
    //return this.http.get(LECTURE_API2 + 'getAllNewscategories', httpOptions);
  }
  private allCategoriesEvenementRequest$?: Observable<any> ;
  getAllEvCategoriesEvenement(refresh?:boolean): Observable<any> {
    if (!this.allCategoriesEvenementRequest$ || refresh) {
      this.allCategoriesEvenementRequest$ = this.http.get(LECTURE_API2 + 'getAllEvcategorieevenements', httpOptions).pipe(
        shareReplay(1)
      );
    }

    return this.allCategoriesEvenementRequest$;
    //return this.http.get(LECTURE_API2 + 'getAllEvcategorieevenements', httpOptions);
  }
  private allpaysRequest$?: Observable<any> ;
  getAllpays(refresh?:boolean): Observable<any> {
    if (!this.allpaysRequest$ || refresh) {
      this.allpaysRequest$ = this.http.get(LECTURE_API2 + 'getAllPays', httpOptions).pipe(
        shareReplay(1)
      );
    }

    return this.allpaysRequest$;
    //return this.http.get(LECTURE_API2 + 'getAllPays', httpOptions);
  }
  private allcategorieageRequest$?: Observable<any> ;
  getAllEvCategoriesAge(refresh?:number): Observable<any> {
    if (!this.allcategorieageRequest$ || refresh) {
      this.allcategorieageRequest$ = this.http.get(LECTURE_API2 + 'getAllEvcategorieages', httpOptions).pipe(
        shareReplay(1)
      );
    }

    return this.allcategorieageRequest$;
    //return this.http.get(LECTURE_API2 + 'getAllEvcategorieages', httpOptions);
  }
  private allclubsRequest$?: Observable<any> ;
  getAllClubs(refresh?:boolean): Observable<any> {
    if (!this.allclubsRequest$ || refresh) {
      const timer$ = timer(0, temps_raffraichissement);

     //For each tick make an http request to fetch new data
      
      this.allclubsRequest$ = timer$.pipe(
        switchMap(_ => this.http.get(LECTURE_API2 + 'getAllClubs', httpOptions)),
        shareReplay(1)
      );
      
      
    }

    return this.allclubsRequest$;
    //return this.http.get(LECTURE_API2 + 'getAllClubs', httpOptions);
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
  private allVideosRequest$?: Observable<any> ;
  getAllVideos(refresh?:boolean): Observable<any> {
    if (!this.allVideosRequest$ || refresh) {
      const timer$ = timer(0, temps_raffraichissement);

     //For each tick make an http request to fetch new data
      
      this.allVideosRequest$ = timer$.pipe(
        switchMap(_ => this.http.get(LECTURE_API2 + 'getAllVideos', httpOptions)),
        shareReplay(1)
      );
      
      
    }

    return this.allVideosRequest$;
   // return this.http.get(LECTURE_API2 + 'getAllVideos', httpOptions);
  }
  getVideo(id:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getVideoById/'+id, httpOptions);
  }
  getVideosbyChampionID(id:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getVideosbyChampionID/'+id, httpOptions);
  }
  getVideosbyEvenementID(id:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getVideosbyEvenementID/'+id, httpOptions);
  }
  getAllImageByChampionId(id:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllImageByChampionId/'+id, httpOptions);
  }
  getAllImageByEvenementID(id:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllImageByEvenementID/'+id, httpOptions);
  }
  getSimilarsVideo(cid:number,tid:number,t2id:number,eid:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getSimilarsVideos/'+cid+"/"+tid+"/"+t2id+"/"+eid, httpOptions);
  }
  getLastCommentaires(): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getLastCommentaires', httpOptions);
  }
  getAllCommentsByUserId(id:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllCommentsByUserId/'+id, httpOptions);
  }
  getAllCommentsByVideoId(id:number): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getAllCommentsByVideoId/'+id, httpOptions);
  }
  getVideoByTitreOrCategorie(mot_cle:string,categorie:string): Observable<any> {
    return this.http.get(LECTURE_API2 + 'getByTitreOrCategorie/'+mot_cle+"/"+categorie, httpOptions);
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

