import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MenuRoutingModule } from './menu-routing.module';
import { ItemsComponent } from './items/items.component';
import { CategoryComponent } from './category/category.component';

/*Shared [Components/Pipes/Popups]*/
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [ItemsComponent, CategoryComponent]
})
export class MenuModule { }
