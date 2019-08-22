import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeListComponent } from './Employee/employe-list.component';
import { EmployeCreateComponent } from './Employee/employe-create.component';


const routes: Routes = [
  { path: 'list', component: EmployeListComponent },
  { path: 'create', component: EmployeCreateComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
