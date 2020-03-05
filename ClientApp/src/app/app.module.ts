import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { RegisterComponent } from './Account/register.component';
import { Appsettings } from './appsettings';
import { LoaderComponent } from './loader.component';
import { LoaderService } from './loader.service';
import { EmployeeDetailComponent } from './Employee/employee-detail.component';
import { EmployeeEditComponent } from './Employee/employe-edit.component';
import { StockAverageComponent } from './Stocks/stock-average.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeListComponent,
    EmployeCreateComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    LoaderComponent,
    EmployeeDetailComponent,
    EmployeeEditComponent,
    StockAverageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,


  ],
  providers: [AuthGuard,
    CookieService,
    Appsettings,
    LoaderService,
    NavbarComponent
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: Myinterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
