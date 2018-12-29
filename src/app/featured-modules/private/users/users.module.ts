import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRequestComponent } from './user-request/user-request.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    UsersRoutingModule
  ],
  declarations: [
    UserComponent,
    UserListComponent,
    UserRequestComponent
  ]
})
export class UsersModule { }