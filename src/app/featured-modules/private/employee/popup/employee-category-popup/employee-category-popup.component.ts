import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { HttpService, AppToastrService, UtilityService } from '@app/core';

@Component({
  selector: 'app-employee-category-popup',
  templateUrl: './employee-category-popup.component.html',
  styleUrls: ['./employee-category-popup.component.scss']
})
export class EmployeeCategoryPopupComponent implements OnInit {

  _options;
  @Input('options') 
  get options(){
    return this._options;
  }
  set options(data: Options){
    this._options = data;
  };

  employeeCategoryForm: FormGroup;
  userRoles = [];
  requestPending: boolean = false;
  isFormSubmit : boolean = false;
  serverErr : boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private modalConfig: NgbModalConfig,
    private utilityService : UtilityService,
    private fb: FormBuilder,
    public http : HttpService
  ) { 
    modalConfig.backdrop = 'static';
    modalConfig.keyboard = false;
  }

  ngOnInit() {
    this.userRoles = this.utilityService.getUserRoles();
    let isUpdate :boolean = (this.options.type == 'update');
    let data: ModelData = {
      categoryName : isUpdate ? this.options.data.categoryName : '',
      role : isUpdate ? this.options.data.accessType : this.userRoles[0].value
    }
    isUpdate && (data['empCategoryId'] = this.options.data['_id']);
    this.createForm(data);
  }


  createForm(data) {
    this.employeeCategoryForm = this.fb.group({
      categoryName : [data.categoryName, Validators.required],
      role: [data.role, Validators.required]
    });
    if(this.options.type == 'update'){
      let empCategoryIdcontrol: FormControl = new FormControl(data['empCategoryId'], Validators.required)
      this.employeeCategoryForm.addControl('empCategoryId', empCategoryIdcontrol);
    }
  };
  
  resetBranchForm(){
    this.isFormSubmit = false;
    this.employeeCategoryForm.reset();
  }

  save(valid, value){
    this.isFormSubmit = true;
    if(!valid){
      return;
    }
    this.requestPending = true;
    this.serverErr = false;
    if(this.options.type == 'update'){
      return this.updateEmpCategory(value);
    }
    this.createNewEmpCategory(value);
  }

  createNewEmpCategory(data){
    let obj = {
      name : data.categoryName,
      type : data.role,
    };
    this.http.post('employee/category/new', obj)
    .subscribe(success => {
      this.requestPending = false;
      this.activeModal.close(true);
      console.log("Success call----",success);
    },err => {
      this.requestPending = false;
      if(err.status == 409){
        this.serverErr = true;
      }
      console.log("Error call----",err);
    });
  }

  updateEmpCategory(data){
    let obj = {
      empCategoryId: data.empCategoryId,
      name : data.categoryName,
      type : data.role
    };
    this.http.put('employee/category/update', obj)
    .subscribe(success => {
      this.requestPending = false;
      this.activeModal.close(true);
      console.log("Success call----",success);
    },err => {
      this.requestPending = false;
      if(err.status == 409){
        this.serverErr = true;
        //console.log("Branch Already exist");
      }
      console.log("Error call----",err);
    });
    
  }

}

export interface Options{
  type: string,
  data: any
}

export interface ModelData{
  categoryName: string,
  role: number
  branchId? : string
}
