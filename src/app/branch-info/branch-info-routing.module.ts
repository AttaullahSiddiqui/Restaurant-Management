import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesListComponent } from './employees-list/employees-list.component';
import { BranchesListComponent } from './branches-list/branches-list.component';

const routes: Routes = [{
  path: '',
  component: BranchesListComponent,
},{
  path: 'employees',
  component: EmployeesListComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchInfoRoutingModule { }
