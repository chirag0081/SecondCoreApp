import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IEmployee } from './employee';
import { EmployeeService } from './employee.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent implements OnInit {
  employees: IEmployee[];
  constructor(private http: HttpClient, private employeeService: EmployeeService, private router: Router) {

  }

  ngOnInit() {
    this.employeeService.GetEmployees().subscribe(x => { this.employees = x; }, error => {
      if (error.ok == false && error.name == "HttpErrorResponse" && error.status == 200) {
        this.router.navigate(['login']);
      }
      console.log(error);
    });
  }


}
