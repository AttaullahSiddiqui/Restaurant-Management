import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  isActive: boolean = false;
  showMenu: string = '';
  menuIcon : string = 'fa-plus';
  
  constructor() { }

  ngOnInit() {
  }

  eventCalled() {
      this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
      if (element === this.showMenu) {
          this.showMenu = '0';
          this.menuIcon = 'fa-plus';
      } else {
          this.showMenu = element;
          this.menuIcon = 'fa-minus';
      }
  }

}
