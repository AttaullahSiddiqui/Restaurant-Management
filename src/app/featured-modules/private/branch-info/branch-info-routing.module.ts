import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchesListComponent } from './branches-list/branches-list.component';

const routes: Routes = [{
  path: '',
  component: BranchesListComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchInfoRoutingModule { }
