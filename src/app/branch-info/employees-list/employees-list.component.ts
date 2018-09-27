import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  private fabBtnOptions = {
    position: 'top',
    value: 'Add'
  }
  private page = 1;

  constructor() { }

  ngOnInit() {
  }

  pageChange(e){
    console.log("Page Change : ",e);
  }

}
