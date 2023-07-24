import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

const header = new HttpHeaders({
  'Content-type':'application/json'
})

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  login(json: any): Observable<any>{
    return this.httpClient.post(environment.api + 'login', json, {headers: header})
  }

  signin(json: any): Observable<any>{
    return this.httpClient.post(environment.api + 'signin', json, {headers: header})
  }



}
