import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './login';
import { User } from './user';
import { Appsettings } from '../appsettings';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: User;
  
  constructor(private http: HttpClient) { }

  public Login(login: Login): Observable<any> {
    return this.http.post<any>(Appsettings.API_ENDPOINT + '/accountapi/login', { email: login.Email, password: login.Password, isRemember: login.IsRember }, { headers: { 'Content-Type':'application/json' } });
  }
  public Logout(): Observable<any> {    
    return this.http.post<any>(Appsettings.API_ENDPOINT + '/accountapi/logout','', { headers: { 'Content-Type': 'application/json' } });
  }
}
