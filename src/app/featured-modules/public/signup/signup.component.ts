import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpService } from '@app/core';

import { routerTransition } from '../router.animations';
import { PublicService } from '../public.service';

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
  requestPending: boolean = false;
  errorMsg : string;

  constructor(
    private fb : FormBuilder,
    public http : HttpService,
    public publicService : PublicService
  ) {};

  ngOnInit() {
    this.creatLoginForm();
  };

  creatLoginForm(){
    this.signupForm = this.fb.group({
      userName  : ['', [Validators.required, this.publicService.userNameSpaceValidator]],
      password  : ['', [Validators.required, Validators.maxLength(12), Validators.minLength(5)]],
      mobileNo : ['', [Validators.required, Validators.minLength(11)]]
    });
  };

  createUser(valid, formData){
    this.errorMsg = "";
    this.isFormSubmit = true;
    if(!valid){
        return;
    }
    this.requestPending = true;
    this.http.post('user/new', formData).subscribe(result => {
        this.requestPending = false;
        this.isFormSubmit = false;
        this.signupForm.reset();
        console.log("Result : ",result);
    }, err => {
      if(err.status == 409){
        this.errorMsg = err.message[0]
      }else{
        this.errorMsg = "Uexpected error. Please try again";
      }
      this.requestPending = false;
      this.isFormSubmit = false;
      console.log("Error : ",err);
    });
  };

}
