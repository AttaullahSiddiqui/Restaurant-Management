import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { HttpService, AppToastrService } from '@app/core';
@Component({
  selector: 'app-employee-category',
  templateUrl: './employee-category.component.html',
  styleUrls: ['./employee-category.component.scss']
})
export class EmployeeCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  requestPending: boolean = false;
  isFormSubmit : boolean = false;
  serverErr : boolean = false;
  
  constructor(
    private fb: FormBuilder,
    public http : HttpService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.categoryForm = this.fb.group({
      name : ['', Validators.required]
    });
  };

  editCategory(index){

  }

  removeCategory(index){

  }

  cancelCategory(index){

  }

  updateCategory(index){

  }
}
