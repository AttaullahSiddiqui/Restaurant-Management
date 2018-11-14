import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MenuRoutingModule } from './menu-routing.module';
import { ItemsComponent } from './items/items.component';
import { CategoryComponent } from './category/category.component';
import { ItemPopupComponent } from './popup/item-popup/item-popup.component';
import { CategoryPopupComponent } from './popup/category-popup/category-popup.component';

/*Shared [Components/Pipes/Popups]*/
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  declarations: [ItemsComponent, CategoryComponent, ItemPopupComponent, CategoryPopupComponent],
  entryComponents: [ItemPopupComponent, CategoryPopupComponent]
})
export class MenuModule { }
