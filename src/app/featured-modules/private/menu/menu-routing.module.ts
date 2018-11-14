import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsComponent } from './items/items.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [{
    path: 'items',
    component: ItemsComponent
  },{
    path: 'categories',
    component: CategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
