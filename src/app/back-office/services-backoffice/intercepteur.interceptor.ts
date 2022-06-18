import { Injectable } from '@angular/core';
import { StockageJwtService } from './stockage-jwt.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { VariablesGlobales } from '../../sharedModule/Variables-Globales';
import {
  HTTP_INTERCEPTORS,
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpErrorResponse ,
  HttpInterceptor
} from '@angular/common/http';
const TOKEN_HEADER_KEY = 'Authorization';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthentificationAdminJWTService } from './authentification-admin-jwt.service';
import { AuthentificationService } from '../../user-view/services/authentification.service';

@Injectable()//cette classe intercepte les requettes http pour verifier ou ajouter des tokens. Elle est importee dans tous les modules du shared module
export class IntercepteurInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private tokenService: StockageJwtService, private authService: AuthentificationAdminJWTService,private authFrontService: AuthentificationService) { }
  

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenService.getAccessToken();
    if (token != null && !authReq.url.includes('login')&& !authReq.url.includes('refreshToken')) {
      //seront interceptées les requettes envoyées aux autres microservices et qui neccessite le token d'access
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, VariablesGlobales.tokenPrefix + token) });
    }
    
    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes('login') && error.status === 401) {
        //si un microservice rejette une requette pour invalidite du token
        console.log("token expiré")
        //il faut savoir quel microservice d'authentification contacter pour le renouvellement
    if(this.tokenService.getUserNormal()){
      //utilisateur connecté sur la partie avant du site, donc contacter le service AuthUser
      return this.handle401ErrorFront(authReq, next);
    }else if(this.tokenService.getUser()){
      //utilisateur connecté sur la partie arriere du site, donc contacter le service authAdmin
      return this.handle401ErrorBackOffice(authReq, next);
    }
    
      }
      return throwError(error);
    }));
  }


  private handle401ErrorBackOffice(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const refreshtoken = this.tokenService.getRefreshToken();
      //je recupere le refresh token
      if (refreshtoken)//je cree une requette vers le service d'authentification pour avoir ma nouvelle paire access/refresh tokens
        return this.authService.refreshToken(refreshtoken).pipe(
          switchMap((tokens: any) => {
            this.isRefreshing = false;
            console.log("tokens recuperes du service Auth admin(backoffice)",tokens)
            this.tokenService.saveAccessToken(tokens.jwtAccessToken);
            //je sauvegarde l'access token
            this.refreshTokenSubject.next(tokens.jwtRefreshToken);
            //j'inclu le refresh token dans la requette pour quelle continue
            return next.handle(this.addTokenHeader(request, tokens.jwtAccessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            //si on ne m'a pas renvoye la paire de tokens
            //this.tokenService.signOut();
            console.log("erreur de recuperation de token")
            return throwError(err);
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }









  private handle401ErrorFront(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const refreshtoken = this.tokenService.getRefreshToken();
      //je recupere le refresh token
      if (refreshtoken)//je cree une requette vers le service d'authentification pour avoir ma nouvelle paire access/refresh tokens
        return this.authFrontService.refreshToken(refreshtoken).pipe(
          switchMap((tokens: any) => {
            this.isRefreshing = false;
            console.log("tokens recuperes du service Auth User(front)",tokens)
            this.tokenService.saveAccessToken(tokens.jwtAccessToken);
            //je sauvegarde l'access token
            this.refreshTokenSubject.next(tokens.jwtRefreshToken);
            //j'inclu le refresh token dans la requette pour quelle continue
            return next.handle(this.addTokenHeader(request, tokens.jwtAccessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            //si on ne m'a pas renvoye la paire de tokens
            //this.tokenService.signOut();
            console.log("erreur de recuperation de token")
            return throwError(err);
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }


  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, VariablesGlobales.tokenPrefix + token) });
  }



}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: IntercepteurInterceptor, multi: true }];
