import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { HttpService, AppToastrService } from '@app/core';

@Component({
  selector: 'app-branch-popup',
  templateUrl: './branch-popup.component.html',
  styleUrls: ['./branch-popup.component.scss']
})
export class BranchPopupComponent implements OnInit {

  _options;
  @Input('options') 
  get options(){
    return this._options;
  }
  set options(data: Options){
    this._options = data;
  };

  branchForm: FormGroup;
  requestPending: boolean = false;
  isFormSubmit : boolean = false;
  serverErr : boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private modalConfig: NgbModalConfig,
    private fb: FormBuilder,
    public http : HttpService
  ) { 
    modalConfig.backdrop = 'static';
    modalConfig.keyboard = false;
  }

  ngOnInit() {
    let isUpdate :boolean = (this.options.type == 'update');
    let data: ModelData = {
      branchName : isUpdate ? this.options.data.branchName : '',
      branchAddress : isUpdate ? this.options.data.branchAddress : '',
      city : isUpdate ? this.options.data.city : '',
      openingDate : '',
    }
    if(isUpdate){
      data['branchId'] = this.options.data['_id'];
      let date = new Date(this.options.data.openingDate);
      let dateObj = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear() 
      }
      data.openingDate = dateObj;

    }
    this.createForm(data);
    //console.log("Options : ---",this.options);
    //console.log("Data : ---",data);
  }

  createForm(data) {
    this.branchForm = this.fb.group({
      branchName : [data.branchName, Validators.required],
      branchAddress : [data.branchAddress, Validators.required],
      city : [data.city, Validators.required],
      openingDate : [data.openingDate, Validators.required]
    });
    if(this.options.type == 'update'){
      let branchIdcontrol: FormControl = new FormControl(data['branchId'], Validators.required)
      this.branchForm.addControl('branchId', branchIdcontrol);
    }
  };

  resetBranchForm(){
    this.isFormSubmit = false;
    this.branchForm.reset();
  }

  save(valid, value){
    this.isFormSubmit = true;
    if(!valid){
      return;
    }
    this.requestPending = true;
    this.serverErr = false;
    if(this.options.type == 'update'){
      return this.updateBranch(value);
    }
    this.createNewBranch(value);
  }

  createNewBranch(data){
    let obj = {
      name : data.branchName,
      address : data.branchAddress,
      city : data.city,
      openingDate : data.openingDate.year + '-' + data.openingDate.month + '-' + data.openingDate.day
    };
    this.http.post('branch/new', obj)
    .subscribe(success => {
      this.requestPending = false;
      this.activeModal.close(true);
      //console.log("Success call----",success);
    },err => {
      this.requestPending = false;
      if(err.status == 409){
        this.serverErr = true;
      }
      //console.log("Error call----",err);
    });
  }

  updateBranch(data){
    let obj = {
      branchId: data.branchId,
      name : data.branchName,
      address : data.branchAddress,
      city : data.city,
      openingDate : data.openingDate.year + '-' + data.openingDate.month + '-' + data.openingDate.day
    };
    this.http.put('branch/update', obj)
    .subscribe(success => {
      this.requestPending = false;
      this.activeModal.close(true);
      //console.log("Success call----",success);
    },err => {
      this.requestPending = false;
      if(err.status == 409){
        this.serverErr = true;
        //console.log("Branch Already exist");
      }
      //console.log("Error call----",err);
    });
    
  }
}


export interface Options{
  type: string,
  data: any
}

export interface ModelData{
    branchName : string
    branchAddress : string
    city : string
    openingDate : any;
    branchId? : string
}