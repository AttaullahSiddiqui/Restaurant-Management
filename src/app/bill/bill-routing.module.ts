import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateBillsComponent } from './create-bills/create-bills.component';
import { BillsStatusComponent } from './bills-status/bills-status.component';

const routes: Routes = [{
  path: 'create',
  component: CreateBillsComponent,
},{
  path: 'status',
  component: CreateBillsComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule { }
