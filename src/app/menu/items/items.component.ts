import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit {

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
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
}