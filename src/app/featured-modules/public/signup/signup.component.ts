import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { routerTransition } from '../router.animations';

interface ItemsResponse {
  results: string[];
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../login/login.component.scss'],
  animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup;
  isFormSubmit: boolean = false;
  isRequestPending: boolean = false;
  errorMsg : string;

  constructor(private fb : FormBuilder) {
    this.creatLoginForm();
  };

  ngOnInit() {
  };

  creatLoginForm(){
    this.signupForm = this.fb.group({
      name      : ['', Validators.required],
      userName  : ['', [Validators.required, this.userNameSpaceValidator]],
      password  : ['', Validators.required],
      contactNo : ['', Validators.required]
    });
  };

  createUser(valid, formData){
    this.errorMsg = "";
    this.isFormSubmit = true;
    if(!valid){
        return;
    }
    this.isRequestPending = true;
  };

  userNameSpaceValidator(control: FormControl) { 
    let userName = control.value;
    var isValid = userName.split(' ');
    if(isValid.length >= 2)
    return {
      noSpaceAllow : true
    }
    return null;
  };

}
