import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isloggedin: boolean;
  constructor(private http: HttpClient) { }

  public Login(login: Login): Observable<any> {
    return this.http.post<any>('api/accountapi/login', { email: login.Email, password: login.Password, isRemember: login.IsRember }, { headers: { 'Content-Type':'application/json' } });
  }
  public Logout(): Observable<any> {    
    return this.http.post<any>('api/accountapi/logout','', { headers: { 'Content-Type': 'application/json' } });
  }
}
