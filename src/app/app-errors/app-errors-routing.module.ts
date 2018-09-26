import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportProblemComponent } from './report-problem/report-problem.component';

const routes: Routes = [{
  path: 'report-problem',
  component: ReportProblemComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppErrorsRoutingModule { }
