import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRequestComponent } from './user-request/user-request.component';
import { AccountTypePipe } from './pipes/account-type.pipe';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    UsersRoutingModule,
    FormsModule
  ],
  declarations: [
    UserComponent,
    UserListComponent,
    UserRequestComponent,
    AccountTypePipe
  ]
})
export class UsersModule { }
