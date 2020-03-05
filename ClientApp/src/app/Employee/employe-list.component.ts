import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../loader.service';
declare let $: any;

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent implements OnInit {
  employees: Employee[];
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;

  constructor(private http: HttpClient, private employeeService: EmployeeService,
    private router: Router, private toastr: ToastrService, private loaderService: LoaderService) {

  }

  ngOnInit() {
    this.loaderService.show();
    this.employeeService.GetEmployees().subscribe(
      x => { this.employees = x; this.loaderService.hide(); },
      error => { console.log(error); this.loaderService.hide(); }
    );
  }

  ViewDetail(id: number) {
    this.router.navigate(['detail', id]);
  }

  EditEmployee(id: number) {
    this.router.navigate(['edit', id]);
  }

  DeleteEmployee(id: number) {
    this.loaderService.show();

    //$('#closeModel').click();

    this.employeeService.DeleteEmployee(id)
      .subscribe(
        (x:any) => {

          this.toastr.success(x.Message);
          console.log("Sucess: " + JSON.stringify(x));
          this.employees.splice(this.employees.findIndex(x => x.Id == id), 1);
          this.loaderService.hide();


          $(this.closeBtn.nativeElement).click();
          $('div.modal-backdrop').css('display', 'none');


        },
        err => {
          console.log('error: ' + JSON.stringify(err));
          this.toastr.success(err.Message);
          this.loaderService.hide();
        }
      );
  }

}
