import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from '../login';
import { LoginService } from '../login.service';
import { debug } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: Login = new Login();
  serverSideErrors: string[] = new Array();
  constructor(private service: LoginService, private router: Router) { }

  ngOnInit() {
  }

  OnLoginFormSubmit(loginForm: NgForm): void {
    this.service.Login(this.loginModel).subscribe(x => {
      if (x.succeeded) {
        localStorage.setItem('IsLoggedIn', "true");
        this.service.isloggedin = false;
        //localStorage.setItem('token', this.f.userid.value); 
        this.router.navigate(['list']);
      }
      else {
        for (var i = 0; i < x[""].errors.length; i++) {
          this.serverSideErrors.push(x[""].errors[i].errorMessage);
        }
      }
    }, error => {
      console.log(error);
    });


  }
}
