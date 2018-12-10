import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { HttpService } from '@app/core';
import { BranchPopupComponent } from '@app/featured-modules/private/branch-info/popup/branch-popup/branch-popup.component';
import { ConfirmationPopupComponent } from '@app/shared/popup/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-branches-list',
  templateUrl: './branches-list.component.html',
  styleUrls: ['./branches-list.component.scss']
})
export class BranchesListComponent implements OnInit {

  branchList : branchDetail[] = [];
  requestPending : boolean = false;
  page: number = 1;
  pageSize: number = 5;

  constructor(
    public http : HttpService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getAllBranches();
  }

  getAllBranches(){
    this.requestPending = true;
    this.http.get('branch/all').subscribe(result => {
      console.log("Result : ",result);
        this.requestPending = false;
        this.branchList = result.body.data;
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
    let ref = this.modalService.open(BranchPopupComponent);
    ref.componentInstance.options = modelData;
    ref.result.then((result) => {
      if(result){
        return this.getAllBranches();
      }
      console.log("Result after close : ",result);
    }, (reason) => {
      this.getAllBranches();
      console.log("Reason after close : ",reason);
    });
  }

  removeConfirmDialog(branchDetail){
    const modalRef = this.modalService.open(ConfirmationPopupComponent, { centered: true }).result.then((result) => {
      if(result){
        const URL = 'branch/remove/?branchId='+branchDetail._id;
        this.http.delete(URL)
          .subscribe(success => {
            this.requestPending = false;
            //console.log("Success call----",success);
            this.getAllBranches();
          },err => {
            this.requestPending = false;
            //console.log("Error call----",err);
          });
      }
    }, (reason) => {});
  };

  pageChange(e){
    console.log("Event : ",e);
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
