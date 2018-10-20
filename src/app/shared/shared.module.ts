import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FabButtonComponent } from './fab-button/fab-button.component';
import { ConfirmationPopupComponent } from './popup/confirmation-popup/confirmation-popup.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [FabButtonComponent, ConfirmationPopupComponent],
  entryComponents: [ConfirmationPopupComponent],
  exports: [FabButtonComponent]
})
export class SharedModule { }
