import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent implements OnInit {
  employees: Employee[];
  constructor(private http: HttpClient, private employeeService: EmployeeService, private router: Router, private toastr: ToastrService) {

  }

  ngOnInit() {
    this.employeeService.GetEmployees().subscribe(x => { this.employees = x; }, error => {
      console.log(error);
    });
  }

  ViewDetail(id: number) {
    this.router.navigate(['detail', id]);
  }

  EditEmployee(id: number) {
    this.router.navigate(['edit', id]);
  }

  DeleteEmployee(id: number) {
    this.employeeService.DeleteEmployee(id).subscribe(x => { console.log(x); }, err => { console.log('error: ' + err) });
  }
}
