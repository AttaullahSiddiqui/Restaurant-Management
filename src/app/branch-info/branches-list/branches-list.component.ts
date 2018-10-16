import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { HttpService } from '@app/core/services/http.service';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-branches-list',
  templateUrl: './branches-list.component.html',
  styleUrls: ['./branches-list.component.scss']
})
export class BranchesListComponent implements OnInit {

  public model: any;
  public dateModel: any;

  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  constructor(public http : HttpService, private modalService: NgbModal) { }

  ngOnInit() {
    this.http.get('branch/all').subscribe(result => {
      console.log("Result : ",result);
    }, err => {
      console.log("Error : ",err);
    })
  }


  public fabBtnOptions = {
    position: 'top',
    value: 'Add'
  }
  public page = 1;

  pageChange(e){
    console.log("Page Change : ",e);
  }

  search = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      )

  openDialog(modalRef, type:string){
    // if(type == 'newBranch'){

    // }

    this.modalService.open(modalRef, { size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log("Result : ",result);
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log("Reason : ",reason);
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

}
