import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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

  branchList : branchDetail[] = [];
  branchForm: FormGroup;
  isFormSubmit : boolean = false;
  requestPending = {
    get: false,
    create : false,
    update: false,
    delete: false
  }

  constructor(
    private fb: FormBuilder,
    public http : HttpService,
    private modalService: NgbModal,
    private modalConfig: NgbModalConfig,
  ) {
    modalConfig.backdrop = 'static';
    modalConfig.keyboard = false;
   }

  ngOnInit() {
    this.createBranchForm();
    this.getAllBranches();
  }

  createBranchForm() {
    this.branchForm = this.fb.group({
      branchName : ['', Validators.required],
      branchAddress : ['', Validators.required],
      city : ['', Validators.required],
      openingDate : ['', Validators.required]
    });
  };

  resetBranchForm(){
    this.isFormSubmit = false;
    this.branchForm.reset();
  }

  getAllBranches(){
    this.requestPending.get = true;
    this.http.get('branch/all').subscribe(result => {
      console.log("Result : ",result);
        this.requestPending.get = false;
        this.branchList = result.body.data;
    }, err => {
      this.requestPending.get = false;
      console.log("Error : ",err);
    })
  };

  createNewBranch(valid, value){
    this.isFormSubmit = true;
    if(!valid){
      return;
    }
    this.requestPending.create = true;
    let obj = {
      name : value.branchName,
      address : value.branchAddress,
      city : value.city,
      openingDate : value.openingDate.year + '-' + value.openingDate.month + '-' + value.openingDate.day
    }
    this.http.post('branch/new', obj).subscribe(result => {
      console.log(result.body.message);
      this.requestPending.create = false;
    }, err => {
      this.requestPending.create = false;
      // if(err.status == 409){

      // }
      console.log("Error in branch creation : ",err);
      
    })
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

  openDialog(type, modalRef, index?){
    this.resetBranchForm();
    // if(type == 'updateBranch' && index){

    // }
    console.log(modalRef);
    this.modalService.open(modalRef, { ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log("Result : ",result);
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log("Reason : ",reason);
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

}


// Intrefaces
interface branchDetail {
  _id: string;
  branchName: string,
  city: string,
  openingDate: string,
  branchAddress: string
}
