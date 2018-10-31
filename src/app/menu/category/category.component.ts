import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  //TODO :: Start
    dummyCategories = [1, 2 ,3, 4 ,5 , 6 ,7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    public page = 1;
  //TODO :: END
  constructor() { }

  ngOnInit() {
  }

  pageChange(e){
    console.log("Page Change : ",e);
  }
}
