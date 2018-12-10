import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeCategoryComponent } from './employee-category/employee-category.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';

const routes: Routes = [{
  path: 'category',
  component: EmployeeCategoryComponent
},{
  path: 'list',
  component: EmployeesListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
