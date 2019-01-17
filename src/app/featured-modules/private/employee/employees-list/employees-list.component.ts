import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';

import { HttpService } from '@app/core';
import { EmployeePopupComponent } from '@app/featured-modules/private/employee/popup/employee-popup/employee-popup.component';
import { ConfirmationPopupComponent } from '@app/shared/popup/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  //TODO ::START:: Need to remove
  userRole : number = 1;
   //TODO ::START:: Need to remove

  employeeList : EmployeeDetail[] = [];
  page : number = 1;
  pageSize: number = 5;
  requestPending : boolean = false;

  private branches;
  private empCategory;
  selectedBranch : string = "All";
  selectedEmpCategory : string = "All";

  constructor(
    public http : HttpService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

    if(this.userRole === 1){
      forkJoin(this.getAllBranches(), this.getEmpCategory()).subscribe(res => {
        this.branches = res[0].body.data;
        this.empCategory = res[1].body.data;
         //console.log("Res of branches and employees: ",res);
      },err => {
        //console.log("Err in branches and employees: ",err);
      });
    }else{
      this.getEmpCategory().subscribe(res => {
        this.empCategory = res.body.data;
        console.log("Res of employee categories: ",res);
      },err => {
        console.log("Err in employee categories: ",err);
      })
    }

    // TODO :: add contion for user base role
    this.getAllEmployeeDetail();
  }


  
  getAllEmployeeDetail(){
    this.requestPending = true;
    this.http.get('employee/all').subscribe(result => {
      //console.log("Result : ",result.body.data);
        this.requestPending = false;
        this.employeeList = result.body.data;
        console.log("Result : ",result);
    }, err => {
      this.requestPending = false;
      console.log("Error : ",err);
    })
  };


  getAllBranches(){
    return this.http.get('branch/all');
  };

  getEmpCategory(){
    return this.http.get('employee/category/all');
  };


  openDialog(type, data?){
    let modelData = {
      type : type,
      userRole : this.userRole,
      initalData : {
        empCategory : this.empCategory
      }
    }
    if(this.userRole === 1){
      modelData.initalData['branches'] = this.branches;
    }
    if(type == 'update' && data){
      modelData['data'] = data;
    }
    let ref = this.modalService.open(EmployeePopupComponent, {size: 'lg'});
    ref.componentInstance.options = modelData;
    ref.result.then((isAnyChange : boolean) => {
      if(isAnyChange){
        return this.getAllEmployeeDetail();
      }
      console.log("Result after close : ",isAnyChange);
    }, (reason) => {
      this.getAllEmployeeDetail();
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