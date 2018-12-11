import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { HttpService } from '@app/core';
import { EmployeeCategoryPopupComponent } from '@app/featured-modules/private/employee/popup/employee-category-popup/employee-category-popup.component';
import { ConfirmationPopupComponent } from '@app/shared/popup/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-employee-category',
  templateUrl: './employee-category.component.html',
  styleUrls: ['./employee-category.component.scss']
})
export class EmployeeCategoryComponent implements OnInit {

  empCategoryList : EmployeeCategory[] = [];
  requestPending: boolean = false;
  isFormSubmit : boolean = false;
  serverErr : boolean = false;
  
  constructor(
    public http : HttpService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getEmployeeCategories();
  }

  getEmployeeCategories(){
    this.requestPending = true;
    this.http.get('employee/category/all').subscribe(result => {
      console.log("Result of employee/category : ",result);
        this.requestPending = false;
        this.empCategoryList = result.body.data;
    }, err => {
      this.requestPending = false;
      console.log("Error in employee/category: ",err);
    })
  };

  openDialog(type, data?){
    let modelData = {
      type : type
    }
    if(type == 'update' && data){
      modelData['data'] = data;
    }
    let ref = this.modalService.open(EmployeeCategoryPopupComponent);
    ref.componentInstance.options = modelData;
    ref.result.then((result) => {
      if(result){
        return this.getEmployeeCategories();
      }
      console.log("Result after close : ",result);
    }, (reason) => {
      this.getEmployeeCategories();
      console.log("Reason after close : ",reason);
    });
  }

  removeConfirmDialog(category){
    const modalRef = this.modalService.open(ConfirmationPopupComponent, { centered: true }).result.then((result) => {
      if(result){
        const URL = 'employee/category/remove/?empCategoryId='+category._id;
        this.http.delete(URL)
          .subscribe(success => {
            this.requestPending = false;
            console.log("Success call----",success);
            this.getEmployeeCategories();
          },err => {
            this.requestPending = false;
            console.log("Error call----",err);
          });
      }
    }, (reason) => {});
  };

}


// Intrefaces
interface EmployeeCategory {
  _id: string;
  categoryName: string,
  role: number
}
