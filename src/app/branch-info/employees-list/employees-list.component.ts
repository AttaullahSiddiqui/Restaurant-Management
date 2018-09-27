import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  public fabBtnOptions = {
    position: 'top',
    value: 'Add'
  }
  public page = 1;

  constructor() { }

  ngOnInit() {
  }

  pageChange(e){
    console.log("Page Change : ",e);
  }

}
