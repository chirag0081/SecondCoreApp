import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeListComponent } from './Employee/employe-list.component';
import { EmployeCreateComponent } from './Employee/employe-create.component';
import { LoginComponent } from './Account/login/login.component';

import { AuthGuard } from './auth/auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { Myinterceptor } from './myinterceptor';
import { NavbarComponent } from './navbar/navbar.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    EmployeListComponent,
    EmployeCreateComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot() 
  ],
  providers: [AuthGuard,
    CookieService,
    NavbarComponent
    //,{provide: HTTP_INTERCEPTORS,
    //  useClass: Myinterceptor,
    //  multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
