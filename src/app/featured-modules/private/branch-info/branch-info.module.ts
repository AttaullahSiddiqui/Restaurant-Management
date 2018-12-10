import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BranchInfoRoutingModule } from './branch-info-routing.module';

/*Shared*/
import { SharedModule } from '@app/shared';
import { BranchesListComponent } from './branches-list/branches-list.component';
import { BranchPopupComponent } from './popup/branch-popup/branch-popup.component';


@NgModule({
  imports: [
    CommonModule,
    BranchInfoRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    BranchesListComponent,
    BranchPopupComponent
  ],
  entryComponents: [
    BranchPopupComponent
  ]
})
export class BranchInfoModule { }
