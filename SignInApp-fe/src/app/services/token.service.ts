import { Injectable } from '@angular/core';

const TOKEN_KEY = "usertoken"

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  clearLocalStorage() {
    window.localStorage.clear();
  }

  public saveToken(token: string){
    window.localStorage.removeItem(TOKEN_KEY)
    window.localStorage.setItem(TOKEN_KEY, token)
  }

  public getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isAuthenticated():boolean {
    let token = this.getToken()
    return token ? true : false
  }
}
