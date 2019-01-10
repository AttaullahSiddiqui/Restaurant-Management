import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService, AppToastrService } from '@app/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  requestPending: boolean;
  users = [];
  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this.requestPending = true;
    this.http.get('user/all').subscribe(result => {
        console.log("Users list : ",result);
        this.requestPending = false;
        //this.users = result.body.data;
    }, err => {
        this.requestPending = false;
        console.log("Error : ",err);
    });
  };
  

}
