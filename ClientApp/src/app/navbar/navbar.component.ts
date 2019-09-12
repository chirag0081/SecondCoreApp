import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Account/login.service';
import { AppComponent } from '../app.component';
import { debug } from 'util';
import { Appsettings } from '../appsettings';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName: string = '';

  constructor(private service: LoginService, private router: Router, public appSetting: Appsettings) {
    if (localStorage.getItem('LoggedInUser') !== null) {
     
      this.userName = JSON.parse(localStorage.getItem('LoggedInUser')).userName;
    }
  }

  ngOnInit(): void {
     
  }

  Logout() {
    this.service.Logout().subscribe(x => {
      this.userName = '';
      localStorage.removeItem('Token');
      localStorage.removeItem('LoggedInUser');
      localStorage.removeItem('LoggedInUserRoles');
      this.router.navigate(['/login']);

    },
      error => {
        console.log(error);
      });
  }


}
