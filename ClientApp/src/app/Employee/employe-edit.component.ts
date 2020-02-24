import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { ToastrService } from 'ngx-toastr'; 
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-employe-edit',
  templateUrl: './employe-edit.component.html',
  styleUrls: ['./employe-create.component.css']
})
export class EmployeeEditComponent implements OnInit {
  empEdit: Employee = new Employee();
  imageUrl: string = '';

  @ViewChild('fileInput',{ static: false } ) 
  myInputVariable: ElementRef;

  constructor(private service: EmployeeService, private _router: ActivatedRoute, private toastr: ToastrService
    , private router: Router) {

  }

  ngOnInit() {
    const id: number = +this._router.snapshot.paramMap.get("id");
    this.service.GetEmployee(id).subscribe((data) => { this.empEdit = data });
  }

  OnFormSubmit(form: NgForm) {
    let formData = new FormData();
    formData.append("Name", this.empEdit.Name);
    formData.append("Email", this.empEdit.Email);
    formData.append("Department", this.empEdit.Department.toString());
    formData.append("Photo", this.empEdit.Photo);

    this.service.EditEmployee(this.empEdit.Id, formData).subscribe(x => {
      if (x.Id > 0) {
        this.toastr.success("Employee Updated Successfully");
        //this.imageUrl = '';
        //this.myInputVariable.nativeElement.value = '';
        //this.empEdit = new Employee();
        //form.reset(this.empEdit);
        this.router.navigate(['list']);
      }
      else {
        this.toastr.error("An Error occured while updating Employee");
      }
    });
  }

  handleFileInput(files: FileList) {
    if (files != null) {
      this.empEdit.Photo = files.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
        console.log(this.imageUrl);
      }
      reader.readAsDataURL(this.empEdit.Photo);
    }
  }

}
