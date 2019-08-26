import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isloggedin: boolean = true;
  constructor(private http: HttpClient) { this.isloggedin = true; localStorage.removeItem('IsLoggedIn');}

  public Login(login: Login): Observable<any> {
    this.isloggedin = true;
    return this.http.post<any>('api/accountapi/login', { email: login.Email, password: login.Password, isRemember: login.IsRember }, { headers: { 'Content-Type':'application/json' } });
  }

}
