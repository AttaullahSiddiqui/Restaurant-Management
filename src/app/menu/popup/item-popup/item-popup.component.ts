import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item-popup',
  templateUrl: './item-popup.component.html',
  styleUrls: ['./item-popup.component.scss']
})
export class ItemPopupComponent implements OnInit {



@Input('menuCategories')
set menuCategories(data) {
    console.log("Data of categories : ",data);
}

  // @Input() menuCategories: any = [];

  constructor(    
    public activeModal: NgbActiveModal,
    private modalConfig: NgbModalConfig,
  ){
    modalConfig.backdrop = 'static';
    modalConfig.keyboard = false;
  }

  ngOnInit(){}

}
