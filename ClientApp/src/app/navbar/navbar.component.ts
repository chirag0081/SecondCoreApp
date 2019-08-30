import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Account/login.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 

  constructor(private service: LoginService, private router: Router, private appComp: AppComponent) {
    if (localStorage.getItem('IsLoggedIn') === "true") {
      this.appComp.isLoggedIn = true;
      this.appComp.userName = localStorage.getItem('LoggedInUserName');
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('IsLoggedIn') === "true") {
      this.appComp.isLoggedIn = true;
      this.appComp.userName = localStorage.getItem('LoggedInUserName');
    }
  }

  Logout() {
    this.service.Logout().subscribe(x => {
      localStorage.removeItem('IsLoggedIn');
      localStorage.removeItem('LoggedInUserName');
      this.appComp.isLoggedIn = false;
      this.appComp.userName = '';
      this.router.navigate(['/login']);
    },
      error => {
        console.log(error);
      });
  }


}
