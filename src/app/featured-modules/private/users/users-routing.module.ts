import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserRequestComponent } from './user-request/user-request.component';

const routes: Routes = [{
  path: '',
  component: UserListComponent 
},{
  path: 'new-request',
  component: UserRequestComponent 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
