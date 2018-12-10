import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';

/*Shared*/
import { SharedModule } from '@app/shared';

import { EmployeeCategoryComponent } from './employee-category/employee-category.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeePopupComponent } from './popup/employee-popup/employee-popup.component';

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [EmployeeCategoryComponent, EmployeesListComponent, EmployeePopupComponent],
  entryComponents: [
    EmployeePopupComponent
  ]
})
export class EmployeeModule { }
