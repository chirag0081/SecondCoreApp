import { Injectable } from '@angular/core';

@Injectable()
export class Appsettings {
  public static API_ENDPOINT = '/api';//'http://localhost:51920/api';
  public static IsUserLoggedIn: boolean = false;
  public static UserName: string = '';

  public localStorageItem(id: string): string {
    return localStorage.getItem(id);
  }

  public getUserName() {
    if (localStorage.getItem('LoggedInUser') !== null) {
      return JSON.parse(localStorage.getItem('LoggedInUser')).userName;
    }
  }

}
