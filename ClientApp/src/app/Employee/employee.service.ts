import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IEmployee } from './Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: IEmployee[];

  constructor(private http: HttpClient) {

  }

  public GetEmployees() {
    this.http.get<IEmployee[]>('api/EmployeeService').subscribe(result => {
      this.employees = result;
      return this.employees;

    }, error => console.error(error));
  }

}
