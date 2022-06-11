import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VariablesGlobales} from '../../sharedModule/Variables-Globales';
const ipMachine=VariablesGlobales.ipMachine
const AUTH_API = 'http://'+ipMachine+':1000/SERVICE-AUTHENTIFICATION-ADMIN/';
const AUTH_API1 = 'http://'+ipMachine+':2002/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthentificationAdminJWTService {

  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('username',username);
    body.set('password',password);
    return this.http.post(AUTH_API1 + 'login', body.toString(), httpOptions);
  }
  register(username: string, email: string, password: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('username',username);
    body.set('password',password);
    body.set('email',email);
    return this.http.post(AUTH_API1 + 'signup', body.toString(), httpOptions);
  }
  refreshToken(refreshToken1: string) {
    console.log("Envoi de demande de renouvellement de token...")
    const httpOptions2 = {
      headers: new HttpHeaders({ 'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': 'Bearer '+refreshToken1, })
    };
    return this.http.get(AUTH_API1 + 'refreshToken', httpOptions2);
  }
}
