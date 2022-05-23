import { Injectable } from '@angular/core';
const ACCESS_TOKEN_KEY = 'access-token';
const REFRESH_TOKEN_KEY = 'refresh-token';
const USER_KEY = 'utilisateur';
const USER_KEY2 = 'utilisateur_normal';
@Injectable({
  providedIn: 'root'
})
export class StockageJwtService {

  constructor() { }
  signOut(): void {
    window.sessionStorage.clear();
  }
  public saveAccessToken(token: string): void {
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
  public getAccessToken(): string | null {
    return window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }
  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return false;
  }
  public saveUserNormal(user2: any): void {
    window.sessionStorage.removeItem(USER_KEY2);
    window.sessionStorage.setItem(USER_KEY2, JSON.stringify(user2));
  }
  public getUserNormal(): any {
    const user2 = window.sessionStorage.getItem(USER_KEY2);
    if (user2) {
      return JSON.parse(user2);
    }
    return false;
  }
}
