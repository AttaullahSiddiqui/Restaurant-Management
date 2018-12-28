import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { routerTransition } from '../router.animations';

interface ItemsResponse {
  results: string[];
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  isFormSubmit: boolean = false;
  isRequestPending: boolean = false;
  errorMsg : string;

  // public toastr: ToastsManager,
  // , vcr: ViewContainerRef
  //private http: HttpClient

  constructor(private fb : FormBuilder) {
    this.creatLoginForm();
    //this.toastr.setRootViewContainerRef(vcr);
   };

  ngOnInit() {
  }

  creatLoginForm(){
    this.loginForm = this.fb.group({
      userName  : ['', [Validators.required, this.userNameSpaceValidator]],
      password  : ['', Validators.required]
    }) 
  };

  authUser(valid, formData){
    this.errorMsg = "";
    this.isFormSubmit = true;
    if(!valid){
        return;
    }
    this.isRequestPending = true;
    // this.http.post<ItemsResponse>('user/login', formData, {observe: 'response'}).subscribe(data => {
    //   //this.toastr.success(data.body['message'], 'Success!');
    //   this.isRequestPending = false;
    //   localStorage.setItem("authToken", data.body['data']);
    //   console.log("Data : ",data);
    // }, err => {
    //   this.isRequestPending = false;
    //   this.errorMsg = err.error.message || 'Unknown Error please try again';
    //   if(err.status === 500){
    //     this.errorMsg = this.errorMsg+ ". If your seeing this constantly contact to developer";
    //   }
    //   console.log("Error in auth : ",err);
    // });
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
