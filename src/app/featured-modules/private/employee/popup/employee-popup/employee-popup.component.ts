import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { HttpService, AppToastrService, UploadImageService } from '@app/core';


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
  private imageFile : any;
  employeeForm: FormGroup;
  requestPending: boolean = false;
  isFormSubmit : boolean = false;
  serverErr : boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private modalConfig: NgbModalConfig,
    private fb: FormBuilder,
    private http : HttpService,
    private imageService : UploadImageService
  ) { 
    modalConfig.backdrop = 'static';
    modalConfig.keyboard = false;
  }

  private branches;
  private empCategory;

  ngOnInit() {
    console.log("Data : ",this.options);
    let formData = this.formMappingData();
    this.createForm(formData);
    this.getBranchesAndEmpCategory().subscribe(res => {
      this.branches = res[0].body.data;
      this.empCategory = res[1].body.data;
      // console.log("Res: ",res);
    },err => {
      // console.log("Erro : ",err);
    });
  };

  formMappingData() : ModelData{
    let isUpdate :boolean = (this.options.type == 'update');
    let data : ModelData;
    if(isUpdate){
      let joinDate : Date = new Date(this.options.data.joiningDate);
       data = {
        employeeId: this.options.data._id,
        name : this.options.data.name,
        fatherName : this.options.data.fatherName,
        age: this.options.data.age,
        branch : this.options.data.emp_branch[0]._id,
        type: this.options.data.emp_category[0]._id,
        picture : '',
        joiningDate : {
          day : joinDate.getDate(),
          month: joinDate.getMonth()+1,
          year:  joinDate.getFullYear()
        },
        resigningDate: this.options.data.resigningDate,
        salary: this.options.data.salary,
        reference: this.options.data.reference,
        contactNo: this.options.data.contactNo,
        address: this.options.data.address
      }
      let picPath = this.options.data.picture;
      picPath ? (this.selectedImage = picPath) : null;
    }else{
      data = {
        name : '',
        fatherName : '',
        age : null,
        branch: '',
        type: '',
        picture : '',
        joiningDate : '',
        salary: null,
        reference: '',
        contactNo: null,
        address: ''
      }
    }
    return data;
  }

  getBranchesAndEmpCategory(){
    let branches = this.http.get('branch/all');
    let empCategory = this.http.get('employee/category/all');
    return forkJoin(branches, empCategory)
  };

  createForm(data) {
    this.employeeForm = this.fb.group({
      name : [data.name, Validators.required],
      fatherName : [data.fatherName, Validators.required],
      age : [data.age, Validators.required],
      branch: [data.branch, Validators.required],
      type: [data.type, Validators.required],      // Type represents employee category
      picture : [data.picture, Validators.required],
      joiningDate : [data.joiningDate, Validators.required],
      salary: [data.salary, Validators.required],
      reference: data.reference,
      contactNo: data.contactNo,
      address: [data.address, Validators.required]
    });
    if(this.options.type == 'update'){
      let employeeIdControl: FormControl = new FormControl(data.employeeId, Validators.required)
      this.employeeForm.addControl('employeeId', employeeIdControl);
      let dateOfResignControl: FormControl = new FormControl(data.resigningDate);
      this.employeeForm.addControl('resigningDate', dateOfResignControl);
    }
  };

  openBrowseWindow(){
    this.browsePictureElement.nativeElement.click();
  }

  fileChange(e){
    this.imageFile = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (readerEvt) => {
      this.selectedImage = readerEvt.target['result'];
    }
    reader.readAsDataURL(this.imageFile);
  };

  
  save(valid, value){
    this.isFormSubmit = true;
    if(!valid){
      return;
    }

    if(this.options.type == 'update'){
      let result = this.findUpdatedProperty(value);
      console.log("Result : ",result);
      result && this.updateEmployeeDetails(result.data);
      return;
    };

    this.createNewEmployee(value);
    return;

    // this.imageService.upload(this.imageFile, 'employee-profile').subscribe(succcess => {
    //   console.log("Image path succcess : ",succcess);
    // }, error => {
    //   console.log("Image path error : ",error);
    // });
  };

  createNewEmployee(data){
    this.requestPending = true;
    data.joiningDate = new Date(data.joiningDate.month+'/'+data.joiningDate.day+"/"+data.joiningDate.year);
    this.http.post('employee/new', data).subscribe(result => {
      console.log("Result : ",result);
      this.requestPending = false;
      this.activeModal.close(true);
    },error => {
      console.log("Result : ",error);
      this.requestPending = false;
    })
  };

  updateEmployeeDetails(data){
    this.requestPending = true;
    this.http.put('employee/update', data).subscribe(result => {
      console.log("Result : ",result);
      this.requestPending = false;
    }, error => {
      console.log("Result : ",error);
      this.requestPending = false;
    });
  }

  findUpdatedProperty(updatedData) : any{
    let isUpdated = false;
    let finalUpdatedObj = {};
    Object.keys(updatedData).forEach( key => {
      switch(key){
        case 'joiningDate': {
          let beforeJoinDate = new Date(this.options.data.joiningDate);
          let afterJoinDate = new Date(updatedData.joiningDate.month+'/'+updatedData.joiningDate.day+'/'+updatedData.joiningDate.year);
          if(beforeJoinDate > afterJoinDate || beforeJoinDate < afterJoinDate){
            isUpdated = true;
            finalUpdatedObj['joiningDate'] = afterJoinDate;
          }
          break;
        }
        case 'resigningDate': {
          if(updatedData.resigningDate){
            let beforeResignDate = new Date(this.options.data.resigningDate);
            let afterResignDate = new Date(updatedData.resigningDate.month+'/'+updatedData.resigningDate.day+'/'+updatedData.resigningDate.year);
            if(beforeResignDate > afterResignDate || beforeResignDate < afterResignDate){
              isUpdated = true;
              finalUpdatedObj['resigningDate'] = afterResignDate;
            }
          }
          break;
        }
        case 'branch': {
          if(this.options.data['emp_branch'][0]._id != updatedData[key]){
            isUpdated = true;
            finalUpdatedObj[key] = updatedData[key];
          }
          break;
        }
        case 'type': {
          if(this.options.data['emp_category'][0]._id != updatedData[key]){
            isUpdated = true;
            finalUpdatedObj[key] = updatedData[key];
          }
          break;
        }
        case 'employeeId': {
          break;
        }
        case 'picture': {
          if(this.imageFile ){
            isUpdated = true;
            finalUpdatedObj[key] = updatedData[key];
          }
          break;
        }
        default : {
          if(this.options.data[key] != updatedData[key]){
            isUpdated = true;
            finalUpdatedObj[key] = updatedData[key];
          }
          break;
        }
      }

    });
    isUpdated ? (finalUpdatedObj['employeeId'] = updatedData.employeeId) : null;
    return {
      isUpdated : isUpdated,
      data : finalUpdatedObj
    };
  };

};


export interface Options{
  type: string,
  data: any
}

export interface ModelData{
  employeeId? : string,
  name : string,
  fatherName : string
  age: Number
  branch : string
  type: string
  picture: string
  joiningDate: any,
  resigningDate? : string,
  salary: Number,
  reference: string,
  contactNo: Number,
  address: string,
}