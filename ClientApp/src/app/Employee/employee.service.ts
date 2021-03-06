import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Employee } from './Employee';
import { Observable } from 'rxjs';
import { Appsettings } from '../appsettings';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnInit {

  private employees: Employee[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  public GetEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(Appsettings.API_ENDPOINT + '/EmployeeService');
  }

  public CreateEmployees(formData: FormData): Observable<Employee> {
    //console.log(formData);
    return this.http.post<Employee>(Appsettings.API_ENDPOINT + '/EmployeeService/CreateEmployee', formData);

  }
  public GetEmployee(id: number): Observable<Employee> {
    //console.log(formData);
    return this.http.get<Employee>(Appsettings.API_ENDPOINT + '/EmployeeService/' + id);

  }
  public EditEmployee(id: number, emp: FormData): Observable<Employee> {
    //console.log(formData);
    return this.http.put<Employee>(Appsettings.API_ENDPOINT + '/EmployeeService/EditEmployee/' + id, emp);
  }


  public DeleteEmployee(id: number): Observable<object> {
    //console.log(formData);
    return this.http.delete<object>(Appsettings.API_ENDPOINT + '/EmployeeService/DeleteEmployee/' + id);
  }

}
