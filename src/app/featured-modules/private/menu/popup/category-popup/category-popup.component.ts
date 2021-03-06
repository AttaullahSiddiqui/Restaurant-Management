import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService, AppToastrService } from '@app/core';

@Component({
  selector: 'app-category-popup',
  templateUrl: './category-popup.component.html',
  styleUrls: ['./category-popup.component.scss']
})
export class CategoryPopupComponent implements OnInit {

  errMsg: string;
  categoryForm: FormGroup;
  isFormSubmit : boolean = false;
  requestPending : boolean = false;
  constructor(    
    public activeModal: NgbActiveModal,
    private modalConfig: NgbModalConfig,
    private fb: FormBuilder,
    public http : HttpService,
    public _toastrService : AppToastrService
  ){
    modalConfig.backdrop = 'static';
    modalConfig.keyboard = false;
  }

  ngOnInit(){
    this.createCategoryForm();
  }

  createCategoryForm() {
    this.categoryForm = this.fb.group({
      categoryName : ['', Validators.required],
    });
  };

  createCategory(valid, value){
    this.errMsg = "";
    this.isFormSubmit = true;
    if(!valid){
      return;
    }
    this.requestPending = true;
    this.http.post('menu/category/new', {name : value.categoryName}).subscribe(result => {
      //console.log(result.body.message);
      this.requestPending = false;
      this.activeModal.close(true);
      this._toastrService.success('Category created successfully');
    }, err => {
      this.requestPending = false;
      if(err.status == 409) {
        this.errMsg = 'Category name already exist';
        return;
      }
      this._toastrService.error('Failed to create category', 'Error');
      //console.log("Error in category creation : ",err);
    });
  };

}
