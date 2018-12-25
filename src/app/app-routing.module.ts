import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent, NotFound404Component } from '@app/core';

const routes: Routes = [{
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './featured-modules/private/dashboard/dashboard.module#DashboardModule'
    },{
      path: 'menu',
      loadChildren: './featured-modules/private/menu/menu.module#MenuModule'
    },{
      path: 'bill',
      loadChildren: './featured-modules/private/bill/bill.module#BillModule'
    },{
      path: 'branches',
      loadChildren: './featured-modules/private/branch-info/branch-info.module#BranchInfoModule'
    },{
      path: 'employee',
      loadChildren: './featured-modules/private/employee/employee.module#EmployeeModule'
    },{
      path: 'user',
      loadChildren: './featured-modules/private/users/users.module#UsersModule'
    }]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: 'public',
      loadChildren: './featured-modules/public/public.module#PublicModule'
    }]
  },{
    path: '**',
    component: NotFound404Component
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
