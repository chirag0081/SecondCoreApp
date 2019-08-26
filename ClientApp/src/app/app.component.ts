import { Component } from '@angular/core';
import { LoginService } from './Account/login.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee';
  constructor(private service: LoginService) {
    //service.isloggedin = true;
    //localStorage.removeItem('IsLoggedIn');
  }
}
