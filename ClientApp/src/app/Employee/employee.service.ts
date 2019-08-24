import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IEmployee } from './Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnInit  {

  private employees: IEmployee[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  public GetEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>('api/EmployeeService');
  }

}
