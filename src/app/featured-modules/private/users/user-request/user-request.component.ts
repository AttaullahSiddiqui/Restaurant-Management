import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService, AppToastrService } from '@app/core';
import { ItemPopupComponent } from '@app/featured-modules/private/menu/popup/item-popup/item-popup.component';

declare var $:any;


@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})
export class UserRequestComponent implements OnInit {

  private selectedValue : string;
  private requestPending: boolean;
  private usersRequest = [];
  private acctountType = [{
    value : '1',
    text: 'Pending'
  },{
    value : '2',
    text: 'Approve'
  },{
    value : '3',
    text: 'Reject'
  }];
  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.getUserRequest();
  };

  getUserRequest(){
    this.requestPending = true;
    this.http.get('user/requests').subscribe(result => {
        console.log("New user account request: ",result);
        this.usersRequest = result.body.data;
        if(this.usersRequest){
          return this.getUserRoles();
        }
        this.requestPending = false;
    }, err => {
        this.requestPending = false;
        console.log("Error : ",err);
    });
  };

  empRoles = {
    manager : [],
    cashier: []
  };

  getUserRoles(){
    this.http.get('employee/roles').subscribe(result => {
        console.log("New user account request: ",result);
        this.requestPending = false;
        var roles = result.body.data;
        roles.forEach(item => {
          if(item.empRole === 2){
            this.empRoles.manager.push(item);
          }else{
            this.empRoles.cashier.push(item);
          }
        });
        console.log("Employee Roles", this.empRoles);
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
        }, 0);
    }, err => {
        this.requestPending = false;
        console.log("Error : ",err);
    });
  }

  approveRequest(type, index){
    if(type != this.usersRequest[index].accountApproved){
      console.log(arguments);
    }
  };


}












// import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import {Observable, Subscription} from 'rxjs';
// import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
// import { HttpService, AppToastrService } from '@app/core';
// declare var $:any;

// @Component({
//   selector: 'app-create-bills',
//   templateUrl: './create-bills.component.html',
//   styleUrls: ['./create-bills.component.scss']
// })
// export class CreateBillsComponent implements OnInit, OnDestroy {
//   @ViewChild('quantity') quantityInput : ElementRef;

//   requestPending : boolean = false;
//   restaurantMenu : menuDetail[] = [];
//   billItem : billItem[] = [];
//   billForm : FormGroup;
//   isFormSubmit: boolean = false;
//   private formSubscriber : FormSubscriber = {};
//   itemCost : any = '- -';
//   totalItemPrice : any = '- -';

//   constructor(
//     public http : HttpService,
//     public _toastrService : AppToastrService,
//     private fb: FormBuilder
//   ) { }

//   ngOnInit() {
//     this.getMenu();
//     this.createBillForm();
//     this.subscribeFormChanges();
//   }

//   ngOnDestroy(){
//     this.unSubscribeFormChanges();
//   }


//   createBillForm(){
//     this.billForm = this.fb.group({
//       itemDetail    : ['', Validators.required],
//       itemQuantity  : ['', Validators.required],
//     })
//   };

//   subscribeFormChanges(){

//     this.formSubscriber.detail = this.billForm.get('itemDetail').valueChanges.pipe(
//         distinctUntilChanged()
//       ).subscribe((data) => {
//         data = JSON.parse(data);
//         if(data){
//           this.itemCost = data.price +'/'+data.unit;
//         }
//         this.quantityInput.nativeElement.focus();
//         console.log("Item Details change : ",data.price);
//     }) 

//     this.formSubscriber.quantity = this.billForm.get('itemQuantity').valueChanges.pipe(
//        distinctUntilChanged()
//       ).subscribe((data) => {
//         if(data && this.itemCost != '- -' ){
//           this.totalItemPrice = +this.itemCost * +data.price;
//         }
//         console.log("Item Quantity change : ",data);
//     })   
//   }

//   calculateAmount(){

//   }

//   unSubscribeFormChanges(){
//     this.formSubscriber.detail.unsubscribe();
//     this.formSubscriber.quantity.unsubscribe();
//     console.log("unsubscribe call : ",this.formSubscriber);
//   }

//   getMenu(){
//     this.requestPending = true;
//     this.http.get('menu').subscribe(result => {
//         console.log("Menu Fetch : ",result);
//         this.requestPending = false;
//         this.restaurantMenu = result.body.data;
//         setTimeout(() => {
//           $('.selectpicker').selectpicker('refresh');
//         }, 0);
//     }, err => {
//         this.requestPending = false;
//         console.log("Error : ",err);
//     });
//   };

//   addItem(valid, data){
//     this.isFormSubmit = true;
//     if(!valid){
//       return ;
//     }
//     console.log("Data :", JSON.parse(data.itemDetail)); 
//   }

//   resetForm(){
//     this.billForm.reset();
//     this.isFormSubmit = false;
//   }

// }

// interface billItem {
//   itemId : string,
//   itemName : string
//   cost :Number
//   quantity : Number 
//   price : Number
// }

// interface menuDetail {
//   _id: string;
//   categoryName: string,
//   city: string,
//   categoryItems: menuItemDetail[],
//   branchAddress: string
// }

// interface menuItemDetail {
//   itemName : string
//   price :Number
//   quantity : Number 
//   unit : string
// }

// interface FormSubscriber{
//   detail? : Subscription,
//   quantity? : Subscription
// }