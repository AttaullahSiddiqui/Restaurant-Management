import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { HttpService } from '@app/core/services/http.service';

@Component({
  selector: 'app-branch-popup',
  templateUrl: './branch-popup.component.html',
  styleUrls: ['./branch-popup.component.scss']
})
export class BranchPopupComponent implements OnInit {

  @Input() options: Options;

  branchForm: FormGroup;
  isFormSubmit : boolean = false;

  constructor(
    private fb: FormBuilder,
    public http : HttpService
  ) { }

  ngOnInit() {
    this.createBranchForm();
  }

  createBranchForm() {
    this.branchForm = this.fb.group({
      branchName : ['', Validators.required],
      branchAddress : ['', Validators.required],
      city : ['', Validators.required],
      openingDate : ['', Validators.required]
    });
  };

  resetBranchForm(){
    this.isFormSubmit = false;
    this.branchForm.reset();
  }
}


export interface Options{
  type: string,
  data: any
}