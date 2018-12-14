import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { HttpService, AppToastrService } from '@app/core';

@Component({
  selector: 'app-employee-popup',
  templateUrl: './employee-popup.component.html',
  styleUrls: ['./employee-popup.component.scss']
})
export class EmployeePopupComponent implements OnInit {
  @ViewChild('browseFile') browsePictureElement : ElementRef;

  _options;
  @Input('options') 
  get options(){
    return this._options;
  }
  set options(data: Options){
    this._options = data;
  };

  selectedImage = "./assets/upload-image.png";
  employeeForm: FormGroup;
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
    this.createForm('');
  }

  createForm(data) {
    this.employeeForm = this.fb.group({
      name : ['', Validators.required],
      fatherName : ['', Validators.required],
      age : ['', Validators.required],
      role: ['', Validators.required],
      picture : ['', Validators.required],
      joiningDate : ['', Validators.required],
      salary: ['', Validators.required],
      reference: [''],
      contactNo: [''],
      address: ['', Validators.required]
    });
    if(this.options.type == 'update'){
      let employeeIdControl: FormControl = new FormControl(data['employeeId'], Validators.required)
      this.employeeForm.addControl('employeeId', employeeIdControl);
      let dateOfResignControl: FormControl = new FormControl('')
      this.employeeForm.addControl('resigningDate', dateOfResignControl);
    }
  };

  openBrowseWindow(){
    this.browsePictureElement.nativeElement.click();
  }

  fileChange(e){
    let file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (readerEvt) => {
      this.selectedImage = readerEvt.target['result'];
    }
    reader.readAsDataURL(file);
  }




  
  save(valid, value){
    
  }

}


export interface Options{
  type: string,
  data: any
}

export interface ModelData{
    name? : string
}