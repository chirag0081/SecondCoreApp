import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  emp: Employee = new Employee();
  constructor(private service: EmployeeService, private _router: ActivatedRoute) {

  }

  ngOnInit() {
    const id: number = +this._router.snapshot.paramMap.get("id");
    this.service.GetEmployee(id).subscribe((data) => { this.emp = data });
  }

}
