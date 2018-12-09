import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { HttpService, AppToastrService } from '@app/core';
declare var $:any;

@Component({
  selector: 'app-create-bills',
  templateUrl: './create-bills.component.html',
  styleUrls: ['./create-bills.component.scss']
})
export class CreateBillsComponent implements OnInit, OnDestroy {
  @ViewChild('quantity') quantityInput : ElementRef;

  requestPending : boolean = false;
  restaurantMenu : menuDetail[] = [];
  billItem : billItem[] = [];
  billForm : FormGroup;
  isFormSubmit: boolean = false;
  private formSubscriber : FormSubscriber = {};
  itemCost : any = '- -';
  totalItemPrice : any = '- -';

  constructor(
    public http : HttpService,
    public _toastrService : AppToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getMenu();
    this.createBillForm();
    this.subscribeFormChanges();
  }

  ngOnDestroy(){
    this.unSubscribeFormChanges();
  }


  createBillForm(){
    this.billForm = this.fb.group({
      itemDetail    : ['', Validators.required],
      itemQuantity  : ['', Validators.required],
    })
  };

  subscribeFormChanges(){

    this.formSubscriber.detail = this.billForm.get('itemDetail').valueChanges.pipe(
        distinctUntilChanged()
      ).subscribe((data) => {
        data = JSON.parse(data);
        if(data){
          this.itemCost = data.price +'/'+data.unit;
        }
        this.quantityInput.nativeElement.focus();
        console.log("Item Details change : ",data.price);
    }) 

    this.formSubscriber.quantity = this.billForm.get('itemQuantity').valueChanges.pipe(
       distinctUntilChanged()
      ).subscribe((data) => {
        if(data && this.itemCost != '- -' ){
          this.totalItemPrice = +this.itemCost * +data.price;
        }
        console.log("Item Quantity change : ",data);
    })   
  }

  calculateAmount(){

  }

  unSubscribeFormChanges(){
    this.formSubscriber.detail.unsubscribe();
    this.formSubscriber.quantity.unsubscribe();
    console.log("unsubscribe call : ",this.formSubscriber);
  }

  getMenu(){
    this.requestPending = true;
    this.http.get('menu').subscribe(result => {
        console.log("Menu Fetch : ",result);
        this.requestPending = false;
        this.restaurantMenu = result.body.data;
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
        }, 0);
    }, err => {
        this.requestPending = false;
        console.log("Error : ",err);
    });
  };

  addItem(valid, data){
    this.isFormSubmit = true;
    if(!valid){
      return ;
    }
    console.log("Data :", JSON.parse(data.itemDetail)); 
  }

  resetForm(){
    this.billForm.reset();
    this.isFormSubmit = false;
  }

}

interface billItem {
  itemId : string,
  itemName : string
  cost :Number
  quantity : Number 
  price : Number
}

interface menuDetail {
  _id: string;
  categoryName: string,
  city: string,
  categoryItems: menuItemDetail[],
  branchAddress: string
}

interface menuItemDetail {
  itemName : string
  price :Number
  quantity : Number 
  unit : string
}

interface FormSubscriber{
  detail? : Subscription,
  quantity? : Subscription
}