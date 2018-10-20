import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbModal, NgbActiveModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent {

  @Input() msg: string;

  constructor(    
    public activeModal: NgbActiveModal,
    private modalConfig: NgbModalConfig,
  ) {
    modalConfig.backdrop = 'static';
    modalConfig.keyboard = false;
   }
}
