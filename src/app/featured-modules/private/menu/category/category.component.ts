import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HttpService, AppToastrService } from '@app/core';
import { CategoryPopupComponent } from '@app/featured-modules/private/menu/popup/category-popup/category-popup.component';
import { ConfirmationPopupComponent } from '@app/shared/popup/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  //TODO :: Start
    public page = 1;
  //TODO :: END
  
  categoryForm: FormGroup;
  isFormSubmit : boolean = false;
  currentRowIndex: Number = -1;
  requestPending = {
    get: false,
    update: false,
    delete: false
  }
  restaurantMenu : menuDetail[] = [];
  initCategoryData : menuDetail;

  constructor(
    private fb: FormBuilder,
    public http : HttpService,
    private modalService: NgbModal,
    public _toastrService : AppToastrService
  ) { };

  ngOnInit() {
    this.createCategoryForm();
    this.getMenu();
  };

  createCategoryForm() {
    this.categoryForm = this.fb.group({
      categoryName : ['', Validators.required],
    });
  };

  resetCategoryForm(){
    this.isFormSubmit = false;
    this.categoryForm.reset();
  };

  pageChange(e){
    console.log("Page Change : ",e);
  };

  openCategoryDialog(){
    this.resetCategoryForm();
    this.modalService.open(CategoryPopupComponent, { centered: true }).result.then((result) => {
      if(result){
        return this.getMenu();
      }
    });
  };

  getMenu(){
    this.requestPending.get = true;
    this.http.get('menu').subscribe(result => {
      //console.log("Menu Fetch : ",result);
        this.requestPending.get = false;
        this.restaurantMenu = result.body.data;
    }, err => {
      this.requestPending.get = false;
      this._toastrService.error('Failed to fetch category', 'Error');
      //console.log("Error : ",err);
    })
  };

  editCategory(category, index){
    this.resetCategoryForm();
    this.initCategoryData = category;
    this.categoryForm.patchValue({
      categoryName: category.categoryName,
    })
    this.currentRowIndex = index;
  };

  cancelCategory(index){
    this.setOldValues(this.initCategoryData, index);
    this.currentRowIndex = -1;
  };

  setOldValues(data, index) {
    this.restaurantMenu[index] = this.initCategoryData;
    this.initCategoryData = null;
  };

  updateCategory(category, index){
    this.isFormSubmit = true;
    if(!this.categoryForm.valid || (this.categoryForm.value.categoryName == this.restaurantMenu[index].categoryName) ){
      return;
    }
    this.requestPending.update = true;
    const obj = {
      menuCategoryId : this.initCategoryData._id,
      name :  this.categoryForm.value.categoryName
    }
    this.http.put('menu/category/update', obj).subscribe(result => {
      //console.log("Result :----->",result.body);
      this.requestPending.update = false;
      this.currentRowIndex = -1;
      this._toastrService.success('Category Updated Successfully');
      this.getMenu();
    }, err => {
      this.requestPending.update = false;
      this.currentRowIndex = -1;
      this._toastrService.error('Failed to update category', 'Error');
      //console.log("Error in category name update : ",err);
    });
  };

  removeCategory(category, index){
    this.modalService.open(ConfirmationPopupComponent, { centered: true }).result.then((result) => {
      if(result){
        this.requestPending.delete = true;
        const url = 'menu/category/remove?menuCategoryId='+category._id
        this.http.delete(url).subscribe(result => {
          //console.log("Result :----->",result);
          this._toastrService.success('Category remove Successfully');
          this.requestPending.delete = false;
          this.restaurantMenu.splice(index, 1);
        }, err => {
          this.requestPending.delete = false;
          this._toastrService.error('Failed to remove category', 'Error');
          //console.log("Error in category name remove : ",err);
        });
      }
    },dismiss => null);
  };


}


// Intrefaces
interface menuDetail {
  _id: string;
  categoryName: string,
  city: string,
  categoryItems: menuItemDetail[],
  branchAddress: string
}

interface menuItemDetail {
  itemName : string
  price :Number
  quantity : Number 
  unit : string
}

