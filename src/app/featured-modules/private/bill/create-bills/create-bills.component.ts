import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { HttpService, AppToastrService } from '@app/core';

@Component({
  selector: 'app-create-bills',
  templateUrl: './create-bills.component.html',
  styleUrls: ['./create-bills.component.scss']
})
export class CreateBillsComponent implements OnInit {

  requestPending : boolean = false;
  restaurantMenu : menuDetail[] = [];
  billItem : billItem[] = [];
  billForm : FormGroup;
  isFormSubmit: boolean = false;

  constructor(
    public http : HttpService,
    public _toastrService : AppToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getMenu();
    this.createBillForm();
  }

  createBillForm(){
    this.billForm = this.fb.group({
      itemDetail    : ['', Validators.required],
      itemQuantity  : ['', Validators.required],
    })
  }

  getMenu(){
    this.requestPending = true;
    this.http.get('menu').subscribe(result => {
        console.log("Menu Fetch : ",result);
        this.requestPending = false;
        this.restaurantMenu = result.body.data;
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
    console.log("Data :",data);
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