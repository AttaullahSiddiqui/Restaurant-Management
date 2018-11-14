import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppErrorsRoutingModule } from './app-errors-routing.module';
import { ReportProblemComponent } from './report-problem/report-problem.component';

@NgModule({
  imports: [
    CommonModule,
    AppErrorsRoutingModule
  ],
  declarations: [ReportProblemComponent]
})
export class AppErrorsModule { }
