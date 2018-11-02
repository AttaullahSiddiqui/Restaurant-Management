import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '@app/core/services/http.service';

declare var $: any;

@Component({
  selector: 'app-item-popup',
  templateUrl: './item-popup.component.html',
  styleUrls: ['./item-popup.component.scss']
})
export class ItemPopupComponent implements OnInit {

  @Input() options: any;

  errMsg: string;
  categoryItemForm: FormGroup;
  isFormSubmit : boolean = false;
  requestPending : boolean = false;

  constructor(    
    public activeModal: NgbActiveModal,
    private modalConfig: NgbModalConfig,
    private fb: FormBuilder,
    public http : HttpService,
  ){
    modalConfig.backdrop = 'static';
    modalConfig.keyboard = false;
  }

  ngOnInit(){
    this.createCategoryItemForm();
    console.log("Options : ",this.options);
  }

  ngAfterViewInit() {   
    $('.selectpicker').selectpicker();
    //$('select').selectpicker();
  }
  
  createCategoryItemForm(){
    this.categoryItemForm = this.fb.group({
      categoryName : ['', Validators.required],
      itemName : ['', Validators.required],
      itemPrice: ['', Validators.required],
      itemUnit: ['', Validators.required]
    });
  };

  submitCall(valid, value){
    this.isFormSubmit = true;
    if(!valid){
      return;
    }
    console.log("Arguments : ",arguments);
  }

}
