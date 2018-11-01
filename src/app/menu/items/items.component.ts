import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import { ItemPopupComponent } from '@app/menu/popup/item-popup/item-popup.component';

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

    search = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      )

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }

  myFunction(e){
    console.log("Event : ",e);
  }

  public fabBtnOptions = {
    position: 'bottom',
    value: 'Add'
  }
  arr = [
    {
        categoryName: 'Karhai',
        items: [
            {
                name: 'Mutton Karhai',
                price: '1600',
                unit: 'KG'
            }, {
                name: 'Mutton Karhai',
                price: '1600',
                unit: 'KG'
            }, {
                name: 'Mutton Karhai',
                price: '1600',
                unit: 'KG'
            }, {
                name: 'Mutton Karhai',
                price: '1600',
                unit: 'KG'
            }, {
                name: 'Mutton Karhai',
                price: '1600',
                unit: 'KG'
            }, {
                name: 'Mutton Karhai',
                price: '1600',
                unit: 'KG'
            }, {
                name: 'Mutton Karhai',
                price: '1600',
                unit: 'KG'
            },
        ]
    },{
        categoryName: 'Sabzi',
        items: [
            {
                name: 'Palak',
                price: '80',
                unit: 'plate'
            }, {
                name: 'Palak',
                price: '80',
                unit: 'plate'
            }, {
                name: 'Palak',
                price: '80',
                unit: 'plate'
            }, {
                name: 'Palak',
                price: '80',
                unit: 'plate'
            }, {
                name: 'Palak',
                price: '80',
                unit: 'plate'
            }
        ]
    }, {
        categoryName: 'Drink',
        items: [
            {
                name: 'Pepsi',
                price: '110',
                unit: '1.ltr'
            }, {
                name: 'Pepsi',
                price: '110',
                unit: '1.ltr'
            }, {
                name: 'Pepsi',
                price: '110',
                unit: '1.ltr'
            }, {
                name: 'Pepsi',
                price: '110',
                unit: '1.ltr'
            }, {
                name: 'Pepsi',
                price: '110',
                unit: '1.ltr'
            }, {
                name: 'Pepsi',
                price: '110',
                unit: '1.ltr'
            }, {
                name: 'Pepsi',
                price: '110',
                unit: '1.ltr'
            },
        ]
    },
  ]

// Modal on edit and close click
  closeResult: string;
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  openItemDialog(){
    this.modalService.open(ItemPopupComponent, { centered: true }).result.then((result) => {
        console.log("Result of confirmation : ",result);
      }, (reason) => {
        console.log("Reason of confirmation : ",reason);
      });
     
  }

}