import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  getHeader() {
    let token = this.tokenService.getToken();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-type': 'application/json'
    })
    return headers;
  }

  login(json: any): Observable<any>{
    return this.httpClient.post(environment.api + 'login', json, {headers: this.getHeader()})
  }

  signin(json: any): Observable<any>{
    return this.httpClient.post(environment.api + 'signin', json, {headers: this.getHeader()})
  }

  logout(): Observable<any>{
    return this.httpClient.post(environment.api + 'logout', {}, {headers: this.getHeader()})
  }

  isLoggedIn(): Observable<any>{
    return this.httpClient.post(environment.api + 'me', {},{headers: this.getHeader()})
  }





}
