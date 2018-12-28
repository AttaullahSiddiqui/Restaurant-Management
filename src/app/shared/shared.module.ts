import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FabButtonComponent } from './fab-button/fab-button.component';
import { ConfirmationPopupComponent } from './popup/confirmation-popup/confirmation-popup.component';
import { RolesPipe } from './pipes/roles.pipe';
import { NumericInputDirective } from './directives/numeric-input.directive';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [FabButtonComponent, ConfirmationPopupComponent, RolesPipe, NumericInputDirective],
  entryComponents: [ConfirmationPopupComponent],
  exports: [FabButtonComponent, RolesPipe, NumericInputDirective]
})
export class SharedModule { }
