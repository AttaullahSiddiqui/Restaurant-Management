import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { BillRoutingModule } from './bill-routing.module';
import { CreateBillsComponent } from './create-bills/create-bills.component';
import { BillsStatusComponent } from './bills-status/bills-status.component';

@NgModule({
  imports: [
    CommonModule,
    BillRoutingModule,
    NgbModule,
    FormsModule
  ],
  declarations: [CreateBillsComponent, BillsStatusComponent]
})
export class BillModule { }
