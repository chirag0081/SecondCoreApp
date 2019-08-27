import { Component } from '@angular/core';
import { LoginService } from './Account/login.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee';
  constructor(private service: LoginService, private router: Router) {
    //service.isloggedin = true;
    //localStorage.removeItem('IsLoggedIn');
  }

  Logout() {
    this.service.Logout().subscribe(x => { this.service.isloggedin = true; localStorage.removeItem('IsLoggedIn'); this.router.navigate(['/login']); }, error => { console.log(error); })
  }

}
