import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from '../login';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../../app.component';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: Login = new Login();
  serverSideErrors: string[] = new Array();

  constructor(private service: LoginService, private router: Router, private cookieService: CookieService, private appComp: AppComponent) { }

  ngOnInit() {
  }

  OnLoginFormSubmit(loginForm: NgForm): void {
    this.service.Login(this.loginModel).subscribe(x => {
      if (x.succeeded) {
        localStorage.setItem('IsLoggedIn', "true");
        localStorage.setItem('LoggedInUserName', x.user.userName);
        this.appComp.isLoggedIn = true;
        this.appComp.userName = x.user.userName;
        this.router.navigate(['/']);
      }
      else {
        for (var i = 0; i < x.errors.length; i++) {
          this.serverSideErrors.push(x.errors[i].errorMessage);
        }
        this.appComp.isLoggedIn = false;
        this.appComp.userName = '';
        localStorage.removeItem('IsLoggedIn');
        localStorage.removeItem('LoggedInUserName')
        
      }
    }, error => {
      console.log(error);
    });


  }
}
