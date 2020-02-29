import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeListComponent } from './Employee/employe-list.component';
import { EmployeCreateComponent } from './Employee/employe-create.component';
import { LoginComponent } from './Account/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './Account/register.component';
import { EmployeeDetailComponent } from './Employee/employee-detail.component';
import { EmployeeEditComponent } from './Employee/employe-edit.component';


const routes: Routes = [
  { path: 'list', component: EmployeListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: EmployeCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EmployeeEditComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: EmployeeDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
