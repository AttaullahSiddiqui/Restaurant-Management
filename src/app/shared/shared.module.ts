import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FabButtonComponent } from './fab-button/fab-button.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [FabButtonComponent],
  exports: [FabButtonComponent]
})
export class SharedModule { }
