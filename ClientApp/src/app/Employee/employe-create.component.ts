import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { ToastrService } from 'ngx-toastr'; 
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-employe-create',
  templateUrl: './employe-create.component.html',
  styleUrls: ['./employe-create.component.css']
})
export class EmployeCreateComponent implements OnInit {
  empCreate: Employee = new Employee();
  imageUrl: string = '';

  @ViewChild('fileInput',{ static: false } ) 
  myInputVariable: ElementRef;

  constructor(private service: EmployeeService, private toastr: ToastrService) {

  }

  ngOnInit() {

  }

  OnFormSubmit(form: NgForm) {
    let formData = new FormData();
    formData.append("Name", this.empCreate.Name);
    formData.append("Email", this.empCreate.Email);
    formData.append("Department", this.empCreate.Department.toString());
    formData.append("Photo", this.empCreate.Photo);

    this.service.CreateEmployees(formData).subscribe(x => {
      if (x.Id > 0) {
        this.toastr.success("Employee Created Successfully");
        this.imageUrl = '';
        this.myInputVariable.nativeElement.value = '';
        this.empCreate = new Employee();
        form.reset(this.empCreate);
      }
      else {
        this.toastr.error("An Error occured while create new Employee");
      }
    });
  }

  handleFileInput(files: FileList) {
    if (files != null) {
      this.empCreate.Photo = files.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
        console.log(this.imageUrl);
      }
      reader.readAsDataURL(this.empCreate.Photo);
    }
  }

}
