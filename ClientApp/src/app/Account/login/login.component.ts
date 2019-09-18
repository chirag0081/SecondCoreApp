import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from '../login';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: Login = new Login();
  serverSideErrors: string[] = new Array();

  constructor(private service: LoginService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
  }

  OnLoginFormSubmit(loginForm: NgForm): void {
    this.serverSideErrors = new Array();
    this.service.Login(this.loginModel).subscribe(x => {
      // console.log(JSON.stringify(x));
      if (x.succeeded) {
       
        localStorage.setItem('Token', x.Token);
        localStorage.setItem('LoggedInUser', JSON.stringify(x.user));
        localStorage.setItem('LoggedInUserRoles', JSON.stringify(x.roles));
        this.router.navigate(['/']);
      }
      else {

        for (var i = 0; i < x.errors.length; i++) {
          this.serverSideErrors.push(x.errors[i]);
        }
        //console.log(JSON.stringify(this.serverSideErrors));
        localStorage.removeItem('Token');
        localStorage.removeItem('LoggedInUser');
        localStorage.removeItem('LoggedInUserRoles');
      }
    }, error => {
      console.log(error);
    });


  }
}
