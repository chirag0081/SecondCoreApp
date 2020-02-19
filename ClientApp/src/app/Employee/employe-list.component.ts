import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent implements OnInit {
  employees: Employee[];
  constructor(private http: HttpClient, private employeeService: EmployeeService, private router: Router) {

  }

  ngOnInit() {
    this.employeeService.GetEmployees().subscribe(x => { this.employees = x; }, error => {
      console.log(error);
    });
  }

  ViewDetail(id: number) {
    this.router.navigate(['detail', id]);
  }

}
