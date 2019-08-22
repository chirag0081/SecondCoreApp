import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeListComponent } from './Employee/employe-list.component';
import { EmployeCreateComponent } from './Employee/employe-create.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeListComponent,
    EmployeCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
