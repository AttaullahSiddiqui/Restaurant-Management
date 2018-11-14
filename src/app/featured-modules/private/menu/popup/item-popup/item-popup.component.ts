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
      categoryId    : ['', Validators.required],
      itemName      : ['', Validators.required],
      itemPrice     : ['', Validators.required],
      itemQuantity  : ['', Validators.required],
      itemUnit      : ['', Validators.required]
    });
  };

  submitCall(valid, value){
    console.log("Arguments : ",arguments);
    this.errMsg = "";
    this.isFormSubmit = true;
    if(!valid){
      return;
    }
    if(this.options.type == 'add'){
      return this.addCategoryItem(value);
    }
    return this.updateCategoryItem(value);
  }

  addCategoryItem(data){
    this.requestPending = true;
    var obj = {
      categoryId  : data.categoryId,
      itemName    : data.itemName,
      price       : data.itemPrice,
      quantity    : data.itemQuantity,
      unit        : data.itemUnit
    }
    this.http.post('menu/item/new', obj).subscribe(result => {
      console.log(result.body.message);
      this.requestPending = false;
      this.activeModal.close(true);
    }, err => {
      this.requestPending = false;
      (err.status == 409) && (this.errMsg = 'Item name already exist in category')
      console.log("Error in item creation : ",err);
    });
  }

  updateCategoryItem(data){

  }

}
