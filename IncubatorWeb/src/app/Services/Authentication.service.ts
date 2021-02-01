import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDetails } from '../ViewModels';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
    
  }
  Login(loginDetails: LoginDetails): Observable<any> {
    return this.http.post('AccountController/Login', loginDetails);
  }
}
