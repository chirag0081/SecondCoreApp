import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeListComponent } from './Employee/employe-list.component';
import { EmployeCreateComponent } from './Employee/employe-create.component';
import { LoginComponent } from './Account/login/login.component';


const routes: Routes = [
  { path: 'list', component: EmployeListComponent },
  { path: 'create', component: EmployeCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
