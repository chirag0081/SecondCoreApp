import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Application';
  isLoggedIn: boolean = false;
  userName: string = '';
  constructor() {
   
  }
  ngOnInit(): void { }
  
}
