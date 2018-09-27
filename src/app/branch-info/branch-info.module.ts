import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { BranchInfoRoutingModule } from './branch-info-routing.module';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { BranchesListComponent } from './branches-list/branches-list.component';

/*Shared*/
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    BranchInfoRoutingModule,
    NgbModule,
    FormsModule,
    SharedModule
  ],
  declarations: [EmployeesListComponent, BranchesListComponent]
})
export class BranchInfoModule { }