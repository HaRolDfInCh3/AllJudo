import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/classes/User';
import { VariablesGlobales} from '../../sharedModule/Variables-Globales';
const ipMachine=VariablesGlobales.ipMachine
const AUTH_API = 'http://'+ipMachine+':1000/SERVICE-AUTHENTIFICATION-USER/';
const AUTH_API1 = 'http://'+ipMachine+':2001/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
const httpOptions2 = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('username',username);
    body.set('password',password);
    return this.http.post(AUTH_API1 + 'login', body.toString(), httpOptions);
  }
  register(user:User): Observable<any> {
    return this.http.post(AUTH_API1 + 'addUser', user, httpOptions2);
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

  getUserByUsername(username:string): Observable<any>{
    return this.http.get(AUTH_API1 + 'getUserByUsername/'+username, httpOptions);
  }
  updateUser(user:any,mdpchange:boolean): Observable<any>{
    return this.http.put(AUTH_API1 + 'updateUser/'+user.id+'/'+mdpchange, user, httpOptions2);
  }
}
