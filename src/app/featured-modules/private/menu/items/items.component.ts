import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpService, AppToastrService } from '@app/core';

import { ItemPopupComponent } from '@app/featured-modules/private/menu/popup/item-popup/item-popup.component';
import { ConfirmationPopupComponent } from '@app/shared/popup/confirmation-popup/confirmation-popup.component';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit {

    public model: any;

    requestPending = {
        get: false,
        update: false,
        delete: false
    }
    restaurantMenu : menuDetail[] = [];

    search = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      )

    constructor(
        private modalService: NgbModal,
        private fb: FormBuilder,
        public http : HttpService,
        public _toastrService : AppToastrService
        ) {}

    ngOnInit() {
        this.getMenu();
    }

    myFunction(e){
        console.log("Event : ",e);
    }

    public fabBtnOptions = {
        position: 'bottom',
        value: 'Add'
    }

    getMenu(){
        this.requestPending.get = true;
        this.http.get('menu').subscribe(result => {
            console.log("Menu Fetch : ",result);
            this.requestPending.get = false;
            this.restaurantMenu = result.body.data;
        }, err => {
            this.requestPending.get = false;
            console.log("Error : ",err);
        });
    };

    openItemDialog(type, categoryIndex?, itemIndex?){
        let modalRef = this.modalService.open(ItemPopupComponent);
        let modelData = {
            menu: this.restaurantMenu,
        }
        if(type == 'add'){
            modalRef.componentInstance.options = { type: 'add', data: modelData};
        }else{
            modelData['categoryIndex'] = categoryIndex;
            modelData['itemIndex'] = itemIndex;
            modalRef.componentInstance.options = { type: 'update', data: modelData };
        }  
        modalRef.result.then( (result) => {
            this.getMenu();
            console.log("Result of confirmation : ",result);
        }, reason => {
            this.getMenu();
            console.log("reason of confirmation : ",reason);
        });
    };

    removeCategoryItem(item, categoryIndex, itemIndex){
        this.modalService.open(ConfirmationPopupComponent, { centered: true }).result.then((result) => {
            if(result){
                this.requestPending.delete = false;
                this.http.delete('menu/item/remove?itemId='+item._id).subscribe(result => {
                    console.log("Item remove successfully : ",result);
                    this.requestPending.delete = false;
                    this.restaurantMenu[categoryIndex].categoryItems.splice(itemIndex, 1);
                }, err => {
                    this.requestPending.delete = false;
                    console.log("Error in remove menu item: ",err);
                });
            }
          },dismiss => null);
    };

}

// Intrefaces
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