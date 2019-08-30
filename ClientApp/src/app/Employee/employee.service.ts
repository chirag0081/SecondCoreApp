import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Employee } from './Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnInit  {

  private employees: Employee[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  public GetEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:51920/api/EmployeeService');
  }

  public CreateEmployees(formData: FormData): Observable<Employee> {
    //console.log(formData);
    return this.http.post<Employee>('http://localhost:51920/api/EmployeeService/CreateEmployee', formData);

  }
   

}
