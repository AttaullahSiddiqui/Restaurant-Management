import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { ItemsComponent } from './items/items.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule
  ],
  declarations: [ItemsComponent, CategoryComponent]
})
export class MenuModule { }
