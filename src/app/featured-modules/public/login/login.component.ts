import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { routerTransition } from '../router.animations';
import { PublicService } from '../public.service';
import { HttpService, UtilityService } from '@app/core';

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

  constructor(
    private fb : FormBuilder,
    public publicService: PublicService,
    public http: HttpService,
    public utility: UtilityService,
    private route: Router
  ) {};

  ngOnInit() {
    this.creatLoginForm();
  };

  creatLoginForm(){
    this.loginForm = this.fb.group({
      userName  : ['', [Validators.required, this.publicService.userNameSpaceValidator]],
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
    this.http.post('user/login', formData).subscribe(result => {
      //console.log("Result : ",result.body.data);
      let resultObj = result.body.data;
      this.utility.setToken(resultObj.token);
      this.isRequestPending = false;
      this.isFormSubmit = false;
      this.route.navigate(['/']);
      // if(resultObj.userRole == 1){
      //   this.route.navigate(['/']);
      // }else{
      //   this.route.navigate(['/bill/create']);
      // }
      
    },err => {
      if(err.status == 404 || err.status == 403){
        this.errorMsg = err.message;
      }else{
        this.errorMsg = "Uexpected error. Please try again";
      }
      this.isRequestPending = false;
      this.isFormSubmit = false;
      //console.log("Error : ",err);
    });
  };

}
