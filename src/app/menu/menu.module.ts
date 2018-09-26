import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MenuRoutingModule } from './menu-routing.module';
import { ItemsComponent } from './items/items.component';
import { CategoryComponent } from './category/category.component';

/*Core Components*/
import { FabButtonComponent } from '../core/fab-button/fab-button.component';

@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule
  ],
  declarations: [ItemsComponent, CategoryComponent, FabButtonComponent]
})
export class MenuModule { }
