import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IEmployee } from './employee';

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent implements OnInit {
  employees: IEmployee[];
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<IEmployee[]>('/api/EmployeeService').subscribe(result => {
      this.employees = result;
      console.log(this.employees);

    }, error => console.error(error));
  }

}
