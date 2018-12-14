import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { HttpService } from '@app/core';
import { EmployeePopupComponent } from '@app/featured-modules/private/employee/popup/employee-popup/employee-popup.component';
import { ConfirmationPopupComponent } from '@app/shared/popup/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  employeeList : EmployeeDetail[] = [];
  page : number = 1;
  pageSize: number = 5;
  requestPending : boolean = false;

  constructor(
    public http : HttpService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getAllEmployeeDetail()
  }

  getAllEmployeeDetail(){
    this.requestPending = true;
    this.http.get('employee/all').subscribe(result => {
      console.log("Result : ",result);
        this.requestPending = false;
        //this.employeeList = result.body.data;
    }, err => {
      this.requestPending = false;
      console.log("Error : ",err);
    })
  };


  openDialog(type, data?){
    let modelData = {
      type : type
    }
    if(type == 'update' && data){
      modelData['data'] = data;
    }
    let ref = this.modalService.open(EmployeePopupComponent, {size: 'lg'});
    ref.componentInstance.options = modelData;
    ref.result.then((result) => {
      if(result){
        //return this.getAllEmployeeDetail();
      }
      console.log("Result after close : ",result);
    }, (reason) => {
      //this.getAllEmployeeDetail();
      console.log("Reason after close : ",reason);
    });
  }

  removeConfirmDialog(branchDetail){
    const modalRef = this.modalService.open(ConfirmationPopupComponent, { centered: true }).result.then((result) => {
      if(result){
        console.log("Result if : ",result);
        // const URL = '/remove/?branchId='+branchDetail._id;
        // this.http.delete(URL)
        //   .subscribe(success => {
        //     this.requestPending = false;
        //     //console.log("Success call----",success);
        //     this.getAllEmployeeDetail();
        //   },err => {
        //     this.requestPending = false;
        //     //console.log("Error call----",err);
        //   });
      }
      console.log("Result else : ",result);
    }, (reason) => {});
  };


  pageChange(e){
    console.log("Page Change : ",e);
  }

}


export interface EmployeeDetail{
  name?: '',
  fatherName? : '',
  age?: '',
  cnic?: ''
}